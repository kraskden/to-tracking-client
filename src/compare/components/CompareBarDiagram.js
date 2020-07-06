import React, {
  useState,
  useEffect
} from 'react'
import MultipleBarDiagram from '../../charts/MultipleBarDiagram'
import CompareValuesGroups from '../utils/CompareValuesGroups'
import CompareValuesParser from '../utils/CompareValuesParser'
import Dropdown from '../../charts/controls/Dropdown'

export default function CompareBarDiagram({usersData}) {

  const [diagramData, setDiagramData] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {

    const users = usersData.data
    let diagramData = []

    if (users.length > 0) {

      /*
      parse data for bar diagram
      */
  
      CompareValuesGroups.SCGroup.forEach(
        entry => {
          const dataArray = CompareValuesParser.parseNumber(
            entry.name, entry.key, users
          )
          diagramData.push([entry.name, dataArray])
        }
      )
  
      CompareValuesGroups.KDGroup.forEach(
        entry => {
          const dataArray = CompareValuesParser.parseNumber(
            entry.name, entry.key, users
          )
          diagramData.push([entry.name, dataArray])
        }
      )
  
      CompareValuesGroups.RatioGroup.forEach(
        entry => {
          const dataArray = CompareValuesParser.parseRatio(
            entry.name, entry.dividend, entry.divider, users
          )
          diagramData.push([entry.name, dataArray])
        }
      )
  
      const parsedTime = CompareValuesParser.parseTime(users)
      diagramData.push(["Time", parsedTime])
  
  
      /*
      set diagramData
      */
  
      setDiagramData(diagramData)
    } else {
      setDiagramData(null)
    }

    /*
    update selected data if usersData changed
    */

    if (selected) {
      const value = selected[0][0]
      setSelected(diagramData.filter(data => data[0] === value))
    }

    // stringify to catch all changes in complex data structures
    // eslint-disable-next-line
  }, [JSON.stringify(usersData.data)])


  const onChange = value => {
    setSelected(diagramData.filter(data => data[0] === value))
  }

  return (
    diagramData
    ? (<>
        <Dropdown
          values={diagramData.map(entry => ({id: entry[0], name: entry[0]}))}
          onChange={onChange}
        />
        <MultipleBarDiagram
          diagramData={selected}
        />
      </>)
    : <div>No users selected</div>
  )
}

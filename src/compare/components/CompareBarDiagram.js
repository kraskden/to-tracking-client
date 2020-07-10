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
    let newDiagramData = []

    if (users.length > 0) {
      const {
        Nums,
        Ratios
      } = CompareValuesGroups

      const {
        parseNumFor,
        parseRatioFor,
        parseTimeFor
      } = CompareValuesParser

      // parse data for diagram

      Nums.forEach(({name, key}) => {
        const parsedArr = users.map(user => parseNumFor(user, name, key))
        newDiagramData.push({
          dataName: name,
          data: parsedArr
        })
      })

      Ratios.forEach(({name, dividend, divider}) => {
        const parsedArr = users.map(user => parseRatioFor(user, name, dividend, divider))
        newDiagramData.push({
          dataName: name,
          data: parsedArr
        })
      })

      const parsedTime = users.map(user => parseTimeFor(user))
      newDiagramData.push({
        dataName: 'Hours played',
        data: parsedTime
      })

      // set diagramData

      setDiagramData(newDiagramData)
    } else {
      setDiagramData(null)
    }
  }, [usersData.data])


  const onChange = value => {
    setSelected(diagramData.filter(data => data.dataName === value))
  }

  return (
    diagramData
    ? (<div className="container">
        <div className="row">
          <h4 className="col-6 col-md-2">Chart</h4>
          <Dropdown
            values={diagramData.map(({dataName}) => ({id: dataName, name: dataName}))}
            onChange={onChange}
            className="col-6 col-md-10"
          />
        </div>
        <div className="row mt-3">
          <MultipleBarDiagram
            diagramData={selected}
            className="col"
          />
        </div>
      </div>)
    : <div>No selected users</div>
  )
}

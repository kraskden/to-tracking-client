import React, {
  useState,
  useEffect
} from 'react'
import MultipleBarDiagram from '../../charts/MultipleBarDiagram'
import CompareValuesGroups from '../utils/CompareValuesGroups'
import CompareValuesParser from '../utils/CompareValuesParser'

export default function CompareBarDiagram({usersData}) {

  const [diagramData, setDiagramData] = useState(null)

  useEffect(() => {

    const users = usersData.data
    let diagramData = []

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

    // stringify to catch all changes in complex data structures
    // eslint-disable-next-line
  }, [JSON.stringify(usersData.data)])


  return (
    <MultipleBarDiagram
      diagramData={diagramData}
    />
  )
}

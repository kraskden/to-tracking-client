import React, {
  useState,
  useEffect
} from 'react'
import MultipleBarDiagram from '../../charts/MultipleBarDiagram'
import {
  Nums,
  Ratios
} from '../utils/CompareValuesGroups'
import {
  parseNum,
  parseRatio,
  parseTime
} from '../utils/CompareValuesParser'
import Dropdown from '../../charts/controls/Dropdown'

export default function CompareBarDiagram({usersData}) {

  const [diagramData, setDiagramData] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const users = usersData.data

    if (users.length > 0) {
      const parsedNums = Nums.map(({name, key}) => 
        parseNum(users, name, key)
      )
      const parsedRatios = Ratios.map(({name, dividend, divider}) => 
        parseRatio(users, name, dividend, divider)
      )
      const parsedTime = parseTime(users, "Hours played")

      setDiagramData([...parsedNums, ...parsedRatios, parsedTime])
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

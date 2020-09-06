import React, {useState, useEffect} from 'react'
import moment from 'moment'

import PropTypes from 'prop-types'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import OnlineApi from '../net/OnlineApi'

function PcuMainGraph(props) {

  const [data, setData] = useState([])
  
  useEffect(() => {
    loadData();
  }, [])

  function loadData() {
    OnlineApi.getPcu().then((res) => {
      // res.days.push(res.today)
      setData(res.days.map(day => {
        let dateObj = new Date(day.date)
        day.date = `${dateObj.getDate()}/${(dateObj.getMonth() + 1)}`
        return day
      }))
    })
  }

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <Line type='monotone' dataKey='pcu' stroke='#3a3af9' dot={false} />
        <XAxis dataKey='date' />
        <YAxis scale="linear" dataKey='pcu' domain={[props.start, 'dataMax']} />
        <Tooltip />
        <CartesianGrid vertical={false}/>
        {/* <Tooltip /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}

PcuMainGraph.propTypes = {

}

export default PcuMainGraph


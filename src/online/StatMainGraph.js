import React, {useState, useEffect} from 'react'
import moment from 'moment'

import PropTypes, { func } from 'prop-types'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import OnlineApi from '../net/OnlineApi'

function addOnlineComponents(sum, item) {
  sum.pcu += item.pcu
  sum.avg += item.avg
}

function addOnlineToSum(sum, item) {
  addOnlineComponents(sum.online, item.online)
  addOnlineComponents(sum.inbattles, item.inbattles) 
}

function StatMainGraph(props) {

  const [data, setData] = useState([])
  const [time, setTime] = useState(null)
  
  useEffect(() => {
    if (props.graphId.indexOf('STAT') != -1 && time != props.time) {
      loadData();
      setTime(props.time)
    }
  }, [props.time, props.graphId, props.avgInterval])


  function loadData() {
    OnlineApi.getDayStat(props.time).then((res) => {
      // res.days.push(res.today)
      let data = res.days.map(day => {
        let dateObj = new Date(day.date)
        day.date = `${dateObj.getDate()}/${(dateObj.getMonth() + 1)}`
        return day
      })
      const interval = 14;
      let sum = {
        online: {pcu: 0, avg: 0},
        inbattles: {pcu: 0, avg: 0}
      }
      for (let i = 0; i < interval; ++i) {
        addOnlineToSum(sum, data[i])
      }
      setData(data)
    })
  }

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <Line type='monotone' dataKey={`online.${props.type}`} stroke='#3a3af9' dot={false} strokeWidth={2}  isAnimationActive={false}/>
        <Line type='monotone' dataKey={`inbattles.${props.type}`} stroke='#ff0000' dot={false} strokeWidth={2} isAnimationActive={false}/>
        <Line type='monotone' dataKey={`avgOnline.${props.type}`} stroke='#00ff00' dot={false} strokeWidth={1}  isAnimationActive={false}/>
        <Line type='monotone' dataKey={`avgInbattles.${props.type}`} stroke='#ff0000' dot={false} strokeWidth={1} isAnimationActive={false}/>
        <XAxis dataKey='date' />
        <YAxis scale="linear" dataKey={`online.${props.type}`} domain={[props.start, 'dataMax']} />
        <Tooltip />
        <CartesianGrid vertical={false}/>
        {/* <Tooltip /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}

StatMainGraph.propTypes = {

}

export default StatMainGraph


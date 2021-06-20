import React, {useState, useEffect} from 'react'
import moment from 'moment'

import PropTypes, { func } from 'prop-types'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import OnlineApi from '../net/OnlineApi'
import Switch from '../user/components/Switch'

function addOnlineComponents(sum, item) {
  sum.pcu += item.pcu
  sum.avg += item.avg
}

function subOnlineComponents(sum, item) {
  sum.pcu -= item.pcu
  sum.avg -= item.avg
}

function calcOnlineCompAvg(sum, div) {
  return {
    pcu: Math.ceil(sum.pcu / div),
    avg: Math.ceil(sum.avg / div)
  }
}

function addOnlineToSum(sum, item) {
  addOnlineComponents(sum.online, item.online)
  addOnlineComponents(sum.inbattles, item.inbattles) 
}

function subOnlineFromSum(sum, item) {
  subOnlineComponents(sum.online, item.online)
  subOnlineComponents(sum.inbattles, item.inbattles) 
}


function calcOnlineAvg(sum, div) {
  return {
    online: calcOnlineCompAvg(sum.online, div),
    inbattles: calcOnlineCompAvg(sum.inbattles, div)
  }
}

function getDelta(time) {
  // 2, 4, 6, 8, 10
  let d = Math.max(Math.ceil(time / 60), 2)
  return d % 2 == 0 ? d : d + 1
}

const interval_switcher = [
  {id: "INTERVAL_MINUS", name: "−"},
  {id: "INTERVAL_PLUS", name: "+"}
]

function StatMainGraph(props) {

  const [data, setData] = useState([])
  const [time, setTime] = useState(null)

  const [avgInterval, setAvgInterval] = useState(0)
  
  useEffect(() => {
    if (props.graphId.indexOf('STAT') != -1 && time != props.time) {
      loadData();
      setTime(props.time)
      setAvgInterval(0)
    }
  }, [props.time, props.graphId])

  useEffect(() => {
    let deadZoneBorder = 0
    for (let i = 0; i < data.length; ++i) {
      if (data[i].inbattles.pcu) {
        deadZoneBorder = i
        break;
      }
    }

    let newData = [...data]
    let sum = {
      online: {pcu: 0, avg: 0},
      inbattles: {pcu: 0, avg: 0}
    }
    let inbSum = {
      online: {pcu: 0, avg: 0},
      inbattles: {pcu: 0, avg: 0}
    }
    for (let i = 0; i < avgInterval; ++i) {
      addOnlineToSum(sum, data[i])
      data[i].avgOnline = {}
    }
    for (let i = deadZoneBorder; (i < deadZoneBorder + avgInterval) && (i < data.length); ++i) {
      addOnlineToSum(inbSum, data[i])
      data[i].avgInbattles = {}
    }
    for (let i = avgInterval; i < data.length; ++i) {
      subOnlineFromSum(sum, data[i - avgInterval])
      addOnlineToSum(sum, data[i])
      let avg = calcOnlineAvg(sum, avgInterval)
      newData[i].avgOnline = avg.online
      // newData[i].avgInbattles = avg.inbattles
    }
    for (let i = deadZoneBorder + avgInterval; i < data.length; ++i) {
      subOnlineFromSum(inbSum, data[i - avgInterval])
      addOnlineToSum(inbSum, data[i])
      let avg = calcOnlineAvg(inbSum, avgInterval)
      newData[i].avgInbattles  = avg.inbattles
    }
    setData(newData)
  }, [avgInterval])

  function loadData() {
    OnlineApi.getDayStat(props.time).then((res) => {
      // res.days.push(res.today)
      let data = res.days.map(day => {
        let dateObj = new Date(day.date)
        day.date = `${dateObj.getDate()}/${(dateObj.getMonth() + 1)}`
        return day
      })
      setData(data)
    })
  }

  function onAvgChange(dir) {
    let delta = dir ? getDelta(props.time) : 0;
    let mul = dir == "INTERVAL_PLUS" ? 1 : -1;
    let newInterval = avgInterval + mul * delta
    if (newInterval == delta) {
      newInterval = delta + 1
    }
    if (newInterval >= data.length) {
      newInterval = avgInterval
    }
    setAvgInterval(Math.max(newInterval, 0))
  }

  return (
    <>
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <Line type='monotone' dataKey={`online.${props.type}`} stroke='#3a3af9' dot={false} strokeWidth={2}  isAnimationActive={false}/>
        <Line type='monotone' dataKey={`inbattles.${props.type}`} stroke='#ff0000' dot={false} strokeWidth={2} isAnimationActive={false}/>
        {avgInterval > 0 && <Line type='monotone' dataKey={`avgOnline.${props.type}`} stroke='#bc5090' dot={false} strokeWidth={1.4}  isAnimationActive={false}/> }
        {avgInterval > 0 && <Line type='monotone' dataKey={`avgInbattles.${props.type}`} stroke='#58508d' dot={false} strokeWidth={1.4} isAnimationActive={false}/> }
        <XAxis dataKey='date' />
        <YAxis scale="linear" dataKey={`online.${props.type}`} domain={[props.start, 'dataMax']} />
        <Tooltip />
        <CartesianGrid vertical={false}/>
        {/* <Tooltip /> */}
      </LineChart>
    </ResponsiveContainer>
    <div className="d-flex flex-row-reverse pr-2">
      <div>
        <Switch switches={interval_switcher} onChange={(e) => onAvgChange(e.target.id)}/>
      </div>
      <div  className="pr-4 mt-2">
        <h5>Moving average interval: {avgInterval} days</h5>
      </div>
    </div>
    </>
  )
}

StatMainGraph.propTypes = {

}

export default StatMainGraph


import React, {useState, useEffect} from 'react'
import moment from 'moment'


import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import OnlineApi from '../net/OnlineApi';
import { Tool } from 'react-feather';


function CustomizedTick(props) {
  const { x, y, payload, middles } = props;
  let date = new Date(payload.value)
  let formatedDate = moment(date).tz('Europe/Moscow').format('D/M')
  if (middles.has(payload.index)) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">{formatedDate}</text>
      </g>
    );

  } else {
    return <></>
  }

}


export default function OnlineMainGraph(props) {

  const [data, setData] = useState([])
  const [middles, setMiddles] = useState(new Set())
  const [begins, setBegins] = useState([])

  useEffect(() => {
    loadData()
  }, [])


  function loadData()  {
    const GRAPH_DAYS = 3;
    
    OnlineApi.getTrack(GRAPH_DAYS).then((res) => {
      let arrays = res.days.map(e => e.track)
      // for (const day of res.days) {
      //   arrays.push(day.track)
      // }
      arrays.push(res.today.track)
      //arrays.reverse()

      let total = 0;
      let middles = new Set()
      let begins = []
      for (const arr of arrays) {
        middles.add(total + Math.ceil(arr.length / 2))
        if (arr.length > 0)
          begins.push(arr[0].timestamp)
        total += arr.length
      }
      
      let data = []
      data = data.concat(...arrays)
      setData(data)
      setMiddles(middles)
      setBegins(begins)
    }).catch((err) => console.error(err))
  }


  if (data.length === 0) {
    return null;
  }


  return (

    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <Line type='monotone' dataKey='online' stroke='#3a3af9' dot={false} />
        <XAxis dataKey='timestamp' tickLine={false} interval={0} tick={<CustomizedTick middles={middles}/>} />
        <YAxis dataKey='online' scale="linear" domain={[0, 'dataMax']} />
        <CartesianGrid vertical={false}/>
        <Tooltip labelFormatter={(label) => moment(label).tz('Europe/Minsk').format('llll')}/>
        {begins.map((x, idx) => <ReferenceLine key={idx} x={x} />)}
        {/* <Tooltip /> */}
      </LineChart>
    </ResponsiveContainer>

  )
}

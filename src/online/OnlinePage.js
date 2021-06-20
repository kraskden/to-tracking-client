import React, {useState, useMemo} from 'react'
import PropTypes, { func } from 'prop-types'
import NavBar from '../navbar/NavBar'
import OnlineStatsBlock from './OnlineStatsBlock'
import OnlineMainGraph from './OnlineMainGraph'
import { useHistory } from 'react-router-dom'
import StatMainGraph from './StatMainGraph'
import FaqAlert from '../common/FaqAlert'
import Switch from '../user/components/Switch'

const timeCcu = [
  {
    id: "TIME_SW_CCU_1",
    name: "1d",
    value: 1
  }, 
  {
    id: "TIME_SW_CCU_2",
    name: "4d",
    value: 4
  },
  {
    id: "TIME_SW_CCU_3",
    name: "7d",
    value: 7
  }
]

const timeStat = [
  {
    id: "TIME_SW_STAT_1",
    name: "1m",
    value: 30
  },
  {
    id: "TIME_SW_STAT_2",
    name: "3m",
    value: 90
  }, 
  {
    id: "TIME_SW_STAT_3",
    name: "6m",
    value: 180
  },
  {
    id: "TIME_SW_STAT_4",
    name: "1y",
    value: 365
  },
  {
    id: "TIME_SW_STAT_5",
    name: "∞",
    value: 1000000
  }
]

const timeMap = new Map()
timeStat.concat(timeCcu).forEach(i => {
  timeMap.set(i.id, i)
})

const graphs = [
  {id: "CCU", name: "CCU", time: timeCcu}, 
  {id: "STAT_PCU+", name: "PCU", type:"pcu", start: 'dataMin - 5000', time: timeStat},
  {id: "STAT_AVG+", name: "AVG", type:"avg", start: 'dataMin - 4000', time: timeStat},
]

const zoom_switches = [
  {id: "ZOOM_DISABLE", name: "−"},
  {id: "ZOOM_ENABLE", name: "+"}
]

const graphsMap = new Map()

for (const graph of graphs) {
  graphsMap.set(graph.id, graph)
}


function OnlinePage(props) {

  const history = useHistory()

  const [graph, setGraph] = useState(graphs[0])

  const [zoom, setZoom] = useState(zoom_switches[0].id)

  const [time, setTime] = useState(graphs[0].time[1])

  function getClass(expected) {
    return graph.id.indexOf(expected) !== -1 ? "" : "d-none";
  }

  return (
    <div className="container">
      <NavBar user={props.user} onUserChange={(user) => history.push(`/user/${user}`)} />
      <FaqAlert />
      <div className="card w-100 mt-3 mb-2">
        <div className="card-body">
          <OnlineStatsBlock />
        </div>
      </div>
      <Switch switches={graphs} onChange={(e) =>  {
        const newGraph =  graphsMap.get(e.target.id)
        const oldTimeType = graph.time
        setGraph(newGraph)
        if (newGraph.time != oldTimeType) {
          setTime(newGraph.time[1])
        }
      }}/>
      <div className="ml-2 d-inline">
        <Switch switches={zoom_switches} onChange={(e) => setZoom(e.target.id)}/>
      </div>
      <div className="d-inline float-right">
        <Switch defId={1} switches={graph.time} default={graph.time[1].id} onChange={(e) => setTime(timeMap.get(e.target.id))} />
      </div>
      <div className={`card w-100 mt-2 ${getClass("CCU")}`}>
        <div className="card-body">
          <OnlineMainGraph time={time.value} graphId={graph.id}/>
        </div>
      </div>
      <div className={`card w-100 mt-2 ${getClass("STAT")}`}>
        <div className="card-body">
          <StatMainGraph start={zoom  == "ZOOM_ENABLE" ? graph.start : 0} graphId={graph.id} type={graph.type} time={time.value}/>
        </div>
      </div>
    </div>
  )
}

OnlinePage.propTypes = {
  user: PropTypes.object
}

export default OnlinePage


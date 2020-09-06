import React, {useState, useMemo} from 'react'
import PropTypes, { func } from 'prop-types'
import NavBar from '../navbar/NavBar'
import OnlineStatsBlock from './OnlineStatsBlock'
import OnlineMainGraph from './OnlineMainGraph'
import { useHistory } from 'react-router-dom'
import PcuMainGraph from './PcuMainGraph'
import FaqAlert from '../common/FaqAlert'
import Switch from '../user/components/Switch'



function OnlinePage(props) {

  const history = useHistory()

  const graphs = [{id: "CCU", name: "CCU"}, {id: "PCU", name: "PCU"}, {id: "PCU2", name: "PCU+"}]

  const [graph, setGraph] = useState(graphs[0].id)

  function getClass(expected) {
    console.log(graph)
    return graph.indexOf(expected) !== -1 ? "" : "d-none";
  }

  let start = graph === "PCU2" ? 'dataMin - 1000' : 0;

  return (
    <div className="container">
      <NavBar user={props.user} onUserChange={(user) => history.push(`/user/${user}`)} />
      <FaqAlert />
      <div className="card w-100 mt-3 mb-2">
        <div className="card-body">
          <OnlineStatsBlock />
        </div>
      </div>
      <Switch switches={graphs} onChange={(e) => setGraph(e.target.id)}/>
      <div className={`card w-100 mt-2 ${getClass("CCU")}`}>
        <div className="card-body">
          <OnlineMainGraph />
        </div>
      </div>
      <div className={`card w-100 mt-2 ${getClass("PCU")}`}>
        <div className="card-body">
          <PcuMainGraph start={start}/>
        </div>
      </div>
    </div>
  )
}

OnlinePage.propTypes = {
  user: PropTypes.object
}

export default OnlinePage


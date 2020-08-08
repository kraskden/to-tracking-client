import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar/NavBar'
import OnlineStatsBlock from './OnlineStatsBlock'
import OnlineMainGraph from './OnlineMainGraph'



function OnlinePage(props) {

  return (
    <div className="container">
      <NavBar user={props.user} />
      <div className="card w-100 mt-3">
        <div className="card-body">
          <OnlineStatsBlock />
        </div>
      </div>
      <div className="card w-100 mt-2">
        <div className="card-body">
          <OnlineMainGraph />
        </div>
      </div>
    </div>
  )
}

OnlinePage.propTypes = {
  user: PropTypes.object
}

export default OnlinePage


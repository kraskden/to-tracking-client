import React, { Component } from 'react'
import DataContext from './DataContext'
import Util from '../../util/Util'

export default class UserBox extends Component {

    static contextType = DataContext;

    getRank(score) {
      return Util.getRank(score)
    } 

    getPercent(score) {
      return Util.getPercent(score)
    }

    render() {
        let data = this.context.tracking[0]
        let login = this.context.login
        let rank = this.getRank(data.score)
        let percent = this.getPercent(data.score)
        return (
            <div>
                <div className="mb-2">
                    <h5 className="card-title d-inline">{login}</h5> <h6 className="text-muted d-inline">{rank}</h6> 
                </div>
                <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: percent + '%'}} 
                    aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">{`${percent}%`}</div>
                </div>                
            </div>
        )
    }
}

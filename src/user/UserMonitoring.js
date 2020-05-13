import React, { Component } from 'react'
import DataContext from '../user/components/DataContext'

import DropdownDiagram from '../charts/DropdownDiagram'
import LineDiagram from '../charts/LineDiagram'

export default class UserMonitoring extends Component {

    static contextType = DataContext

    onChange = (val) => {
        console.log(val)
    }

    render() {
        console.log(this.context)
        return (
            <div className="card mt-2">
                <div className="card-body ">
                    <div className="row justify-content-center mb-2">
                        <h4>Decomposed activity</h4>
                    </div>
                    <DropdownDiagram 
                    periods={[{id: 'daily', name: 'Daily'}, {id: 'weekly', name: 'Weekly'}, {id: 'monthly', name: 'Monthly'}]}
                    types={[{id: 'Hull', name: 'Hulls'}, {id: 'Turret', name: 'Turrets'}]}
                    data={this.context}
                    graph={LineDiagram}
                    x='timestamp'
                    height={400}
                    /> 
                </div>
            </div>
                               
        )
    }
}
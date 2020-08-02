import React, { Component } from 'react'
import DataContext from './components/DataContext'
import SummaryTable from '../summary/SummaryTable'
import SummaryParser from '../user/parsers/Summary'
import Switch from './components/Switch'
import BarDiagram from '../charts/BarDiagram'
import BarParser from './parsers/Bar'


function BarDiagramWrapper(props) {
    return (
        <BarDiagram height={30 * props.data.length + 40}
            data={props.data}
            x='name'
            y='time'
        />
    )
}

export default class UserSummary extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            period: 'currWeek'
        }
    }

    onPeriodChange = (e) => {
        this.setState({
            period: e.target.id
        })
    }

    render() {
        // Be careful when change order of {'monthly', 'weekly'}
        let tracking = this.context[this.state.period]
        let lastTracking;
        if (this.state.period.indexOf("curr") !== -1) {
            lastTracking = tracking ? tracking : {activities: [], supplies: []}
        } else {
            lastTracking = tracking[tracking.length - 1] || {activities: [], supplies: []}
        }
        
        let itemActivity = {}
        let isEmptyActivity = true;
        for (const item of ['Hull', 'Turret', 'Mode', 'Module']) {
            let activity =  BarParser.parseActivity(lastTracking.activities, item).sort((a, b) => b.time - a.time)
            isEmptyActivity &= activity.length === 0;
            itemActivity[item] = activity
        }

        let objs = SummaryParser.makePeriodSummary(lastTracking)
        return (
            <div>
                <div className="pt-3">
                    <Switch 
                        switches={[{id: 'currWeek', name: 'Curr week'}, {id: 'weekly', name: 'Prev week'},
                          {id: 'currMonth', name: 'Curr month'}, {id: 'monthly', name: 'Prev month'}, ]}
                        onChange={this.onPeriodChange}
                    />
                </div>
                 <div className="card mt-2">
                    <div className="card-body pb-0">
                        <SummaryTable objs={objs} />
                    </div>
                </div>
                {isEmptyActivity ? <></> :
                <div className="card mt-2">
                    <div className="card-body pb-0">
                        <div className="row">
                            <div className="col-md-6">
                                <BarDiagramWrapper data={itemActivity['Turret']} />
                            </div>
                            <div className="col-md-6">
                                <BarDiagramWrapper data={itemActivity['Hull']} />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <BarDiagramWrapper data={itemActivity['Mode']} />
                            </div>
                            <div className="col-md-6">
                                <BarDiagramWrapper data={itemActivity['Module']} />
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}
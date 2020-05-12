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
            period: 'weekly'
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
        let lastTracking = tracking[tracking.length - 1] || {activities: []}

        let itemActivity = {}
        for (const item of ['Hull', 'Turret', 'Mode', 'Module']) {
            itemActivity[item] = BarParser.parseActivity(lastTracking.activities, item)
        }

        console.log(itemActivity)

        let objs = SummaryParser.makePeriodSummary(tracking[tracking.length - 1])
        return (
            <div>
                <div className="pt-3">
                    <Switch 
                        switches={[{id: 'weekly', name: 'Last week'}, {id: 'monthly', name: 'Last month'},  {id: 'daily', name: 'Last day'}]}
                        onChange={this.onPeriodChange}
                    />
                </div>
                 <div className="card mt-2">
                    <div className="card-body pb-0">
                        <SummaryTable objs={objs} />
                    </div>
                </div>
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
                </div>
            </div>
        )
    }
}
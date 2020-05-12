import React, { Component } from 'react'
import SummaryTable from '../summary/SummaryTable'
import PieDiagram from '../charts/PieDiagram'
import LineDiagram from '../charts/LineDiagram'
import DataContext from '../user/components/DataContext'
import SummaryParser from './parsers/Summary'
import PieParser from './parsers/Pie'
import SwitchDiagram from '../charts/SwitchDiagram'

export default class UserHome extends Component {

    static contextType = DataContext;

    handleChange = (e) => {
        console.log(e.target.id)
    }

    render() {
        let data = this.context
        let summData = this.context.tracking[0]

        let turretPieData = PieParser.decorate(PieParser.makeActivity(summData, 'Turret', 5))
        let hullPieData = PieParser.decorate(PieParser.makeActivity(summData, 'Hull', 5))
        let modePieData = PieParser.decorate(PieParser.makeActivity(summData, 'Mode', 5))
        return (
            <div>
                <div className="card mt-2">
                    <div className="card-body pb-0">
                        <SummaryTable objs={SummaryParser.makeHomeSummary(summData)} />
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-md-4">
                                <PieDiagram data={turretPieData}/>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <PieDiagram data={hullPieData}/>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <PieDiagram data={modePieData}/>
                            </div>
                        </div>               
                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-body ">
                        <div className="row justify-content-center mb-2">
                            <h4>Player activity</h4>
                        </div>
                        <SwitchDiagram graph={LineDiagram} x='timestamp' height={300} 
                            data={data} 
                            periods={[{id: 'daily', name: 'Daily'}, {id: 'weekly', name: 'Weekly'}, {id: 'monthly', name: 'Monthly'}]} 
                            types={[{id: 'cry', name: 'Crystalls'}, {id: 'score', name: 'Score'}, {id: 'time', name: 'Time'}]}/>
                    </div>
                </div>
            </div>
        )
    }
}
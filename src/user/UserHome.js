import React, { Component } from 'react'
import SummaryTable from '../summary/SummaryTable'
import PieDiagram from '../charts/PieDiagram'
import LineDiagram from '../charts/LineDiagram'
import DataContext from '../user/components/DataContext'
import SummaryParser from './parsers/Summary'
import PieParser from './parsers/Pie'

export default class UserHome extends Component {

    static contextType = DataContext;

    objs = [
        {
            "Kills": 12341234,
            "Crystalls": "254254"
        }, 
        {
            "Key2": 41234,
            "Ket45": 24235
        }
    ]

    render() {
        let data = [];
        for (let i = 1; i < 32; ++i) {
            data.push({
                day: `${i}/02`,
                value: Math.round(Math.random() * 1000)
            })
        }
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
                        <div className="row justify-content-start ml-3 mb-2">
                            <div className="col-md-auto">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-secondary">Daily</button>
                                    <button type="button" className="btn btn-secondary">Weekly</button>
                                    <button type="button" className="btn btn-secondary">Monthly</button>
                                </div>
                            </div>
                            <div className="col-md-auto">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-secondary">Crystalls</button>
                                    <button type="button" className="btn btn-secondary">Score</button>
                                    <button type="button" className="btn btn-secondary">Time</button>
                                </div>                                
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-12">
                                <LineDiagram  data={data} height={250} x='day' y='value'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react'
import SummaryTable from '../summary/SummaryTable'
import PieDiagram from '../charts/PieDiagram'
import LineDiagram from '../charts/LineDiagram'

export default class UserHome extends Component {

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
        return (
            <div>
                <div className="card mt-2">
                    <div className="card-body pb-0">
                        <SummaryTable objs={this.objs} />
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-md-4">
                                <PieDiagram />
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <PieDiagram />
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <PieDiagram/>
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
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary">Daily</button>
                                    <button type="button" class="btn btn-secondary">Weekly</button>
                                    <button type="button" class="btn btn-secondary">Monthly</button>
                                </div>
                            </div>
                            <div className="col-md-auto">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary">Crystalls</button>
                                    <button type="button" class="btn btn-secondary">Score</button>
                                    <button type="button" class="btn btn-secondary">Time</button>
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
import React, { Component } from 'react'
import NavBar from './navbar/NavBar'
import UserHome from './user/UserHome'


export default class UserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: "home"
        }
    }

    onTabChange(newTab) {
        this.setState({
            tab: newTab
        })
    }

    ChooseComponent = (props) => {
        return  this.state.tab === "home" ? <UserHome /> : <div></div>
    }


    render() {
        return (
            <div className="container">
                <NavBar />
                <div className="card mt-2">
                    <div className="card-body pb-3">
                        <h5 className="card-title">Fizzika <h6 className="text-muted d-inline"> Legend 8</h6> </h5>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: 25 + '%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                    </div>
                </div>
                <ul class="nav nav-tabs mt-2" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" role="tab" aria-selected="true" onClick={() => this.onTabChange("home")}>Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("summary")}>Summary</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"  data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("monitoring")}>Monitoring</a>
                    </li>
                </ul>
                <this.ChooseComponent />
            </div>
        )
    }
}
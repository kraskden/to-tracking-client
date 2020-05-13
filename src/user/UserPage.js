import React, { Component } from 'react'
import UserHome from './UserHome'
import UserSummary from './UserSummary'
import TrackApi from '../net/TrackApi'
import DataContext from './components/DataContext'
import UserBox from './components/UserBox'
import UserMonitoring from './UserMonitoring'


export default class UserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoaded: false,
            tab: "home"
        }
        
    }

    componentDidMount() {
        this.updateData()
    }

    componentDidUpdate(prevProps) {
        console.log("ComponentDidUpdate")
        if (prevProps.user == null && this.state.isLoaded) {
            this.setState({
                isLoaded: false
            })
        }
        if (prevProps.user !== this.props.user) {
            this.updateData()
        }
    }

    updateData = () => {
        console.log("Updating...")
        if (this.props.user) {
            TrackApi.getAllTrack(this.props.user).then((data) => {
                this.setState({
                    data: data,
                    isLoaded: true
                })
            })
        } else {
            this.setState({
                isLoaded: true
            })
        }
    }

    onTabChange(newTab) {
        this.setState({
            tab: newTab
        })
    }

    ChooseComponent = (props) => {
        switch(this.state.tab) {
            case "home":
                return <UserHome />
            case "summary":
                return <UserSummary />
            case "monitoring":
                return <UserMonitoring />
            default: 
                return <div></div>
        }
    }



    render() {
        if (!this.state.isLoaded || this.props.user === null) {
            return <div></div>
        }
        if (this.state.data === null) {
            return (
                <div className="alert alert-danger mt-3" role="alert">
                    User not found
                </div>
            )
        }
        if (this.state.data.tracking === null || this.state.data.tracking.length === 0) {
            return (
                <div className="alert alert-info mt-3" role="alert">
                    This is a new user! Come later and see statistics
                </div>
            )
        }
        return (
            <DataContext.Provider value={this.state.data} >
                    <div className="card mt-2">
                        <div className="card-body pb-3">
                            <UserBox />
                        </div>
                    </div>
                    <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" role="tab" aria-selected="true" onClick={() => this.onTabChange("home")}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("summary")}>Summary</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"  data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("monitoring")}>Monitoring</a>
                        </li>
                    </ul>
                    <this.ChooseComponent />
            </DataContext.Provider>
        )
    }
}
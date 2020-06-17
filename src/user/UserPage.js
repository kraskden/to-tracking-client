import React, { Component } from 'react'

// pages
import UserHome from './UserHome'
import UserSummary from './UserSummary'
import UserMonitoring from './UserMonitoring'
import UserCompare from './UserCompare'

// components
import TrackApi from '../net/TrackApi'
import DataContext from './components/DataContext'
import UserBox from './components/UserBox'
import SubButton from './components/SubButton'


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
            case "compare":
                return <UserCompare />
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
                    <div className="row align-items-center">
                        <div className="col">
                            <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <button className="nav-link active" data-toggle="tab" role="tab" aria-selected="true" onClick={() => this.onTabChange("home")}>Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("summary")}>Summary</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link"  data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("monitoring")}>Monitoring</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link"  data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("compare")}>Compare</button>
                                </li>
                          </ul>
                        </div>
                        <SubButton profileData={this.props.profileData} login={this.state.data.login} onProfile={this.props.onProfile}/>
                        
                    </div>
                    
                    <this.ChooseComponent />
            </DataContext.Provider>
        )
    }
}

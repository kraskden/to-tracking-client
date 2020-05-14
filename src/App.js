import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import RegPage from './profile/RegPage';
import LoginPage from './profile/LoginPage'
import TrackPage from './user/TrackPage';
import LogoutPage from './profile/LogoutPage';
import AuthApi from './net/AuthApi';
import AdminPage from './profile/AdminPage';
import ProfilePage from './profile/ProfilePage';
  

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileData: null
        }
    }

    componentDidMount() {
        this.onProfileChange()
    }

    onProfileChange = () => {
        AuthApi.getUserInfo().then((info) => {
            this.setState({
                profileData: info
            })
        }, (err) => {
            this.setState({
                profileData: null
            })
        })
    }
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <TrackPage user='Fizzika' profileData={this.state.profileData} onProfile={this.onProfileChange}/>
                    </Route>
                    <Route path="/user/:user" children={(props) => 
                        <TrackPage user={props.match.params.user} profileData={this.state.profileData} onProfile={this.onProfileChange} />} />
                    <Route exact path="/signup" children={(props) => <RegPage history={props.history} />} />
                    <Route exact path="/login" children={(props) => <LoginPage history={props.history} onProfile={this.onProfileChange}/>} />
                    <Route exact path="/logout">
                        <LogoutPage onProfile={this.onProfileChange}/>
                    </Route>
                    <Route exact path="/admin">
                        <AdminPage />
                    </Route>
                    <Route exact path="/profile" children={ (props) =>
                        <ProfilePage profileData={this.state.profileData} history={props.history} onProfile={this.onProfileChange} />} />                        
                </Switch>
            </Router>

        )
    }

}
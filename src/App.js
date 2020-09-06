import React, { Component, lazy, Suspense } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './Home';
import TrackPage from './user/TrackPage';
import AuthApi from './net/AuthApi';
import FaqPage from './common/FaqPage';


const RegPage = lazy(() => import('./profile/RegPage'))

const LoginPage = lazy(() => import('./profile/LoginPage'))
const LogoutPage = lazy(() =>  import('./profile/LogoutPage'))
const ProfilePage = lazy(() => import('./profile/ProfilePage'));
const OnlinePage = lazy(() => import('./online/OnlinePage'));
  

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
        console.log("On change")
        AuthApi.getUserInfo().then((info) => {
            this.setState({
                profileData: info
            })
        }, (err) => {
            console.log(err)
            this.setState({
                profileData: null
            })
        })
    }
    
    render() {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Switch>
                    <Route exact path="/" children={(props) => 
                        <Home history={props.history} profileData={this.state.profileData} onProfile={this.onProfileChange} />} />
                    {/* <Route exact path="/">
                        <TrackPage user='Fizzika' profileData={this.state.profileData} onProfile={this.onProfileChange}/>
                    </Route> */}
                    <Route path="/user/:user" children={(props) => {
                        return <TrackPage user={props.match.params.user} profileData={this.state.profileData} onProfile={this.onProfileChange} />}
                    } />
                        
                    <Route exact path="/signup" children={(props) => <RegPage history={props.history} />} />
                    <Route exact path="/login" children={(props) => <LoginPage history={props.history} onProfile={this.onProfileChange}/>} />
                    <Route exact path="/logout">
                        <LogoutPage onProfile={this.onProfileChange}/>
                    </Route>
                    <Route exact path="/profile" children={ (props) =>
                        <ProfilePage profileData={this.state.profileData} history={props.history} onProfile={this.onProfileChange} />} />  

                    <Route exact path="/online" children={(props) => 
                      <OnlinePage user={this.state.user} />} />    

                    <Route exact path="/faq">
                      <FaqPage user={this.state.user} />
                    </Route>                  
                </Switch>
            </Router>
            </Suspense>

        )
    }

}
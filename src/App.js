import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import RegPage from './profile/RegPage';
import LoginPage from './profile/LoginPage'
import UserPage from './user/UserPage';
import TrackPage from './user/TrackPage';
  

export default class App extends Component {
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <TrackPage user='Fizzika'/>
                    </Route>
                    <Route path="/user/:user" children={(props) => <TrackPage user={props.match.params.user} />} />
                    <Route exact path="/signup">
                        <RegPage />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                </Switch>
            </Router>

        )
    }

}
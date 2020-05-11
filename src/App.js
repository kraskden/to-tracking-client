import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import RegPage from './profile/RegPage';
import LoginPage from './profile/LoginPage'
import UserPage from './UserPage';
  

export default class App extends Component {
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <UserPage />
                    </Route>
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
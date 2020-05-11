import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'
import UserPage from './UserPage'

export default class TrackPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user ? this.props.user : null
        }
    }

    onUserChange = (newUser) => {
        this.setState({
            user: newUser
        })
    }

    render() {
        let UserComponent = (props) => this.state.user ? <UserPage user={this.state.user} /> : <div></div>
        return (
            <div className="container">
                <NavBar onUserChange={this.onUserChange} />
                <UserComponent />
            </div>
        )
    }
}
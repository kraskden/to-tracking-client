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

    componentDidUpdate(props) {
        if (this.props.user !== props.user) {
            this.setState({
                user: this.props.user
            })
        } 
    }

    onUserChange = (newUser) => {
        this.setState({
            user: newUser
        })
        window.history.pushState(newUser, "", `/user/${newUser}`)
    }

    render() {
        return (
            <div className="container">
                <NavBar onUserChange={this.onUserChange} profileData={this.props.profileData} onProfile={this.props.onProfile} />
                <UserPage user={this.state.user} profileData={this.props.profileData} onProfile={this.props.onProfile}/>
            </div>
        )
    }
}
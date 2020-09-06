import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import UserTable from './common/UserTable'
import FaqAlert from './common/FaqAlert'

export default class Home extends Component {

    onUserChange = (newUser) => {
        this.props.history.push(`/user/${newUser}`)
    }

    render() {
        // if (this.props.profileData) {
        //     return <Redirect to={`/user/${this.props.profileData.login}`} />
        // }
        return (
            <div className="container">
                <NavBar onUserChange={this.onUserChange} profileData={this.props.profileData} onProfile={this.props.onProfile} />
                <FaqAlert />
                <UserTable/>
            </div>
        )
    }
}

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
    return (
      <div className="container">
        <NavBar onUserChange={this.onUserChange} profileData={this.props.profileData} onProfile={this.props.onProfile} />
        <FaqAlert />
        <UserTable />
        <div className="d-block d-xl-none">
          <div class="footer-copyright text-center mb-2">TankiRating — Fan site for  
            <a href="https://tankionline.com/"> Tanki Online</a>
          </div>
        </div>
      </div>
    )
  }
}

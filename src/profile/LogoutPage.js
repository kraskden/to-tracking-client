import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthApi from '../net/AuthApi'

export default class LogoutPage extends Component {

    constructor(props) {
        super(props)
        AuthApi.logout()
    }

    render() {
        return <Redirect to='/' />
    }
}
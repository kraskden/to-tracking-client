import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthApi from '../net/AuthApi'

export default class LogoutPage extends Component {

    constructor(props) {
        super(props)
        AuthApi.logout()
        this.props.onProfile()
    }

    render() {
        return <Redirect to='/' />
    }
}
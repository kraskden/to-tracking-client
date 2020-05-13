import React, { Component } from 'react'
import AuthApi from '../net/AuthApi'

export default class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.login = React.createRef()
        this.password = React.createRef()
       
        this.state = {
            message: "Sign In"
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        AuthApi.login(this.login.current.value, this.password.current.value).then(() => {
            console.log("OK")
            this.props.history.replace('/')
        }).catch((err) => {
            this.setState({
                message: "Try again"
            })
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 text-center">
                        <form id="form-login" onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                            <h1 className="h3 mb-3 font-weight-normal mt-2">{this.state.message}</h1>
                            <label htmlFor="inputLogin" className="sr-only">Login</label>
                            <input type="text" id="inputLogin" ref={this.login} name="login" className="form-control mb-2" placeholder="Login" required autoFocus />
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" ref={this.password} name="password" className="form-control mb-2" placeholder="Password" required />
                            <button className="btn btn-lg btn-secondary btn-block" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
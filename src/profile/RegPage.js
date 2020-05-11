import React, { Component } from 'react'

export default class RegPage extends Component {

    constructor(props) {
        super(props)
        this.login = React.createRef()
        this.password = React.createRef()
        this.invite = React.createRef()

        this.state = {
            message: "Sign Up"
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.invite.current.value)
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
                            <label htmlFor="inputInvite" className="sr-only">Invite</label>
                            <input type="text" id="inputInvite" ref={this.invite} name="invite" className="form-control mb-2" placeholder="Invite" required />
                            <button className="btn btn-lg btn-secondary btn-block" type="submit">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
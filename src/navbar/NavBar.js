import React, { Component } from 'react'

export default class NavBar extends Component {

    constructor(props) {
        super(props)
        this.user = React.createRef()
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onUserChange(this.user.current.value)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="/#">Tanki Rating</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse flex-row" id="navbarSupportedContent">
                <form className="form-inline ml-md-4 my-2 my-md-0 flex-md-col  " onSubmit={this.onSubmit}>
                    <input className="form-control mr-sm-2" ref={this.user} type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/#">Action</a>
                    <a className="dropdown-item" href="/#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/#">Something else here</a>
                    </div>
                </li>
                </ul>
            </div>
            </nav>
        )
    }
}
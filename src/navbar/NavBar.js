import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function DropdownItem(props) {

  if (props.data) {
    return (
      <>
        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {props.data.login}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/profile">Profile</a>
          <div className="dropdown-divider"></div>
          {props.data.accounts.map((el) => {
            return (
              <a className="dropdown-item" href={`/user/${el.login}`} key={el.login}>{el.login}</a>
            )
          })}
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/logout">Logout</a>
        </div>
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

function MakeDropdown(props) {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item px-lg-3 d-none d-xl-block">
        <a href="https://tankionline.com" className="nav-link font-weight-bold">Tanki Online</a>
      </li>
      <li className="nav-item px-lg-3">
        <Link to="/" className="nav-link font-weight-bold">Ratings</Link>
      </li>
      <li className="nav-item px-lg-3">
        <Link to="/faq" className="nav-link font-weight-bold">FAQ</Link>
      </li>
      <li className="nav-item px-lg-3">
        <Link to="/online" className="nav-link font-weight-bold">OnlineHub</Link>
      </li>
      <li className="nav-item dropdown">
        <DropdownItem data={props.data} />
      </li>
    </ul>
  )
}

export default class NavBar extends Component {

  constructor(props) {
    super(props)
    this.user = React.createRef()

  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onUserChange(this.user.current.value)
    this.user.current.value = ""
  }

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/#">Tanki Rating</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse flex-row" id="navbarSupportedContent">
          <form className="form-inline ml-lg-4 my-2 my-lg-0 flex-md-col  " onSubmit={this.onSubmit}>
            <input className="form-control mr-md-2" ref={this.user} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-md-0" type="submit">Search</button>
          </form>

          <MakeDropdown data={this.props.profileData} />
        </div>

      </nav>
    )
  }
}
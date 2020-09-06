import React, { Component } from 'react'

export default class Switch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.switches[0].id
    }
  }

  render() {
    let switches = this.props.switches.map((el, idx) => {
      let cls = idx === 0 ? "active" : ""
      return (
        <label
          className={`btn btn-secondary ${cls}`}
          key={el.id}
        >
          <input
            type="radio"
            onClick={this.props.onChange}
            name="options"
            id={el.id}
            checked={el.id == this.state.id}
          />
          {el.name ? el.name : el.id}
        </label>
      )
    })
    return (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">{switches}</div>
    )
  }
}

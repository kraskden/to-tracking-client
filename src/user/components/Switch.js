import React, { Component } from 'react'

export default class Switch extends Component {
    
    render() {
        let switches = this.props.switches.map((el, idx) => {
            let str = idx == 0 ? "active" : ""
            return (
                <label className={`btn btn-secondary ${str} key=${el.id}`}>
                    <input type="radio" onClick={this.props.onChange} name="options" id={el.id} checked/> {el.name ? el.name : el.id}
                </label>
            )
        })
        return (
            <div class="btn-group btn-group-toggle" data-toggle="buttons">{switches}</div>
        )
    }
}
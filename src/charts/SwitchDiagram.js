import React, { Component } from 'react'

// PROPS: 
// periods : {id, name}
// types: {id, name}
// data
// graph
// x, height

export default class SwitchDiagram extends Component {
    constructor(props) {
        super(props)
        this.state = {
            period: props.periods[0].id,
            type: props.types[0].id,
        }
    }

    handlePeriodChange = (el) => {
        this.setState({
            period: el.target.id
        })
    }

    handleStateChange = (el) => {
        this.setState({
            type: el.target.id
        })
    }

    render() {
        let btnPeriod = this.props.periods.map((el, idx) => {
            let str = idx === 0 ? "active" : ""
            return (
                <label
                    className={`btn btn-secondary ${str} `}
                    key={el.id}
                >
                    <input
                        type="radio"
                        onClick={this.handlePeriodChange}
                        name="options" id={el.id}
                        defaultChecked
                    />
                    {el.name ? el.name : el.id}
                </label>
            )
        })
        let btnType = this.props.types.map((el, idx) => {
            let str = idx === 0 ? "active" : ""
            return (
                <label
                    className={`btn btn-secondary ${str}`}
                    key={el.id}
                >
                    <input
                        type="radio"
                        onClick={this.handleStateChange}
                        name="options" id={el.id}
                        defaultChecked
                    />
                    {el.name ? el.name : el.id}
                </label>
            )
        })
        let periodHolder = btnPeriod.length > 1
            ? <div className="btn-group btn-group-toggle" data-toggle="buttons">{btnPeriod}</div>
            : <div></div>
        let typesHolder = btnType.length > 1
            ? <div className="btn-group btn-group-toggle" data-toggle="buttons">{btnType}</div>
            : <div></div>
        return (
            <div>
                <div className="row justify-content-start ml-3 mb-2">
                    <div className="col-md-auto my-md-0 my-2">
                        {periodHolder}
                    </div>
                    <div className="col-md-auto">
                        {typesHolder}                              
                    </div>
                </div>
                <div className="row" >
                    <div className="col-12">
                        {
                            React.createElement(
                                this.props.graph,
                                {
                                    data: this.props.data[this.state.period],
                                    period: this.state.period,
                                    height: this.props.height,
                                    x: this.props.x,
                                    y: this.state.type
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

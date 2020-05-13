import React, { Component } from 'react'
import LineDiagram from './LineDiagram'
import Dropdown from './controls/Dropdown'

// PROPS: 
// periods : {id, name}
// types: {id, name}
// data
// graph
// x, height
export default class DropdownDiagram extends Component {
    constructor(props) {
        super(props)
        this.state = {
            period: props.periods[0].id,
            type: props.types[0].id,
            elements: [],
            element: null
        }
    }

    componentDidMount() {
        this.updateElements()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.login !== this.props.data.login) {
            this.updateElements()
        } else {
            console.log("!!!!")
        }
    }

    handlePeriodChange = (el) => {
        this.setState({
            period: el.target.id
        }, this.updateElements)
    }

    handleStateChange = (el) => {
        this.setState({
            type: el
        }, this.updateElements)
    }

    handleElemChange = (el) => {
        this.setState({
            element: el
        })
    }

    // TODO: natural sorting
    updateElements = () => {
        let data = this.props.data[this.state.period]
        let elements = new Set()
        for (const elem of data) {
            for (const activity of elem.activities.filter((el) => el.role === this.state.type)) {
                elements.add(activity.name)
            }
        }
        console.log(elements.values().next().value)
        this.setState({
            elements: [...elements.values()],
            element: elements.values().next().value
        })
    }

    getData = () => {
        console.log("Get data")
        let data = this.props.data[this.state.period]
        data.forEach((row) => {
            let activity =  row.activities.filter((el) => el.name === this.state.element)[0]
            row.time = activity ? activity.time : 0
        })
        return data.map((entry) => {
            // DANGER HARDCODE!
            return {
                time: entry.time,
                timestamp: entry.timestamp
            }
        })
    }

    render() {
        let btnPeriod = this.props.periods.map((el, idx) => {
            let str = idx == 0 ? "active" : ""
            return (
                <label className={`btn btn-secondary ${str} key=${el.id}`}>
                    <input type="radio" onClick={this.handlePeriodChange} name="options" id={el.id} checked/> {el.name ? el.name : el.id}
                </label>
            )
        })
        let periodHolder = btnPeriod.length > 1 ? <div class="btn-group btn-group-toggle" data-toggle="buttons">{btnPeriod}</div> : <div></div>
        let diagram = <div></div>
        if (this.state.element) {
            diagram = React.createElement(this.props.graph, {
                data: this.getData(),
                period: this.state.period,
                height: this.props.height,
                x: this.props.x, 
                y: 'time'})
        }
        return (
            <div>
                <div className="row justify-content-start ml-3 mb-2">
                    <div className="col-md-auto">
                        {periodHolder}
                    </div>
                    <div className="col-md-auto pl-0">
                        <Dropdown values={this.props.types} onChange={this.handleStateChange}/>                        
                    </div>
                    <div className="col-md-auto pl-0">
                        <Dropdown 
                        values={this.state.elements.map((elem) => {return {id: elem, name: elem}})} 
                        onChange={this.handleElemChange}/>     
                    </div>
                </div>
                <div className="row" >
                    <div className="col-12">
                        {diagram}
                    </div>
                </div>
            </div>
            

        )
    }
}
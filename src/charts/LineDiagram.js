import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default class LineDiagram extends Component {

    constructor(props) {
        console.log("Constructor")
        super(props)
        this.state = {
            data: this.transformData()
        }
    }
    
    transformData() {
        console.log("Start transforming")
        this.data = this.props.data.slice(0)
        this.data = this.data.map((el) => {
            let ret = {}
            ret[this.props.x] = el[this.props.x]
            ret[this.props.y] = el[this.props.y] ? el[this.props.y] : 0;
            if (this.props.y === "time") {
                ret[this.props.y] = (ret[this.props.y] / 3600).toFixed(1)
            }
            if (this.props.x === "timestamp") {
                let date = new Date(el[this.props.x])
                ret.timestamp = `${date.getUTCDate()}/${date.getUTCMonth() + 1}`
            }
            return ret
        })
        return this.data
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.x, prevProps.y, this.props.x, this.props.y)
        if (prevProps.y !== this.props.y || prevProps.x !== this.props.x || prevProps.period != this.props.period || this.props.data != prevProps.data) {
            this.setState({
                data: this.transformData()
            })
        }
    }

    render() {
        return (
            <ResponsiveContainer width='100%' height={this.props.height}>
                <LineChart data={this.state.data}>
                <Line type='monotone' dataKey={this.props.y} stroke='#3a3af9' />
                <CartesianGrid stroke="#373737" strokeDasharray="5 5" />
                <XAxis dataKey={this.props.x} />
                <YAxis dataKey={this.props.y} domain={[0, 'auto']}/>
                <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default class BarDiagram extends Component {
  render() {
    return (
        <ResponsiveContainer width='100%' height={this.props.height}>
            <BarChart 
                width={400} 
                height={500} 
                data={this.props.data} 
                layout="vertical"
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <XAxis type="number"/>
                <YAxis type="category" dataKey={this.props.x} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Bar dataKey={this.props.y} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
  }
}

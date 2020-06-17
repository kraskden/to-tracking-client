import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
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
              {/*type="number"*/}
                <XAxis />
                <YAxis type="category" dataKey="name" />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey={this.props.user1} fill="#8884d8" />
                <Bar dataKey={this.props.user2} fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
  }
}

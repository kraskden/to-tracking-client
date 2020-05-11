import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function LineDiagram(props) {
    return (
    <ResponsiveContainer width='100%' height={props.height}>
        <LineChart data={props.data}>
        <Line type='monotone' dataKey={props.y} stroke='#3a3af9' />
        <CartesianGrid stroke="#373737" strokeDasharray="5 5" />
        <XAxis dataKey={props.x} />
        <YAxis />
        <Tooltip/>
        </LineChart>
    </ResponsiveContainer>
    );
};
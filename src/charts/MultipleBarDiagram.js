import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';


export default function MultipleBarDiagram(props) {
  return (
    <>
      { createCharts(props) }
    </>
  )
}

function createCharts({ dataArrays, users }) {
  return dataArrays.map(array => (
    <ResponsiveContainer
      width="100%"
      height={100}
      key={array[0].name}>
      <BarChart
        width={400}
        height={500}
        data={array}
        layout="vertical"
      >
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        {/* <CartesianGrid strokeDasharray="3 3"/> */}
        <Tooltip />
        <Legend />
        { createBars(users) }
      </BarChart>
    </ResponsiveContainer>
  ))
}

function createBars(users) {
  return users.map(user => (
    <Bar dataKey={user} fill={randomColor()} key={user} />
  ))
}

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

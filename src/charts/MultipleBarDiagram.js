import React, {
  // useEffect,
  // useState
} from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';


export default function MultipleBarDiagram(props) {
  return (
    <>
      { createCharts(props) }
    </>
  )
}

function createCharts({ dataArrays, users }) {

  console.log(dataArrays)

  return dataArrays.map(array => (
    <ResponsiveContainer width="100%" height={100} key={array[0].name}>
      <BarChart
        width={400}
        height={500}
        data={array}
        layout="vertical"
      >
        <XAxis />
        <YAxis
          type="category"
          dataKey="name"
        />
        {/* <CartesianGrid strokeDasharray="3 3"/> */}
        <Tooltip />
        <Legend />
        { createBars(users) }
      </BarChart>
    </ResponsiveContainer>
  ))
}

function createBars(users) {
  console.log(users)
  return users.map(user => (
    <Bar dataKey={user} fill={randomColor()} key={user} />
  ))
}

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

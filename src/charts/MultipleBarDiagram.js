import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';


export default function MultipleBarDiagram(props) {
  return (
    <>
      {
        props.dataArrays.length > 0 && props.users.length > 0
        ? createCharts(props)
        : null
      }
    </>
  )
}

function createCharts({ dataArrays, users }) {
  const colors = createRandomColors(users)

  return dataArrays.map(array => (
    <ResponsiveContainer
      width="100%"
      height={calcHeight(array.length)}
      key={array[0].name}>
      <BarChart
        width={400}
        height={100}
        data={array}
        layout="vertical"
      >
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        { createBars(users, colors) }
      </BarChart>
    </ResponsiveContainer>
  ))
}

const calcHeight = length => 50+(length*50)

function createBars(users, colors) {
  return users.map(user => (
    <Bar dataKey={user} fill={colors[user]} key={user} />
  ))
}

function createRandomColors(users) {
  let colors = {}
  users.forEach(
    user => {
      colors[user] = randomColor()
    }
  )

  return colors
}

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

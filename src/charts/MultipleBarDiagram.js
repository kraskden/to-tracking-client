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
  const colors = getSimilarColors(users)

  return dataArrays.map(array => {
    const height = calcHeight(array.length * users.length)

    return (
      <ResponsiveContainer
        width="100%"
        height={height}
        key={array[0].name}>
        <BarChart
          width={400}
          data={array}
          layout="vertical"
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          { createBars(users, colors) }
        </BarChart>
      </ResponsiveContainer>
    )
  })
}

const calcHeight = length => ((length * 30) + 30 + 24) // + height of xaxis and legend

function createBars(users, colors) {
  return users.map(user => (
    <Bar dataKey={user} fill={colors[user]} key={user} />
  ))
}

function getSimilarColors(users) {
  const mainColor = '8884d8'

  const step = 20000
  let color = parseInt(mainColor, 16) + step

  let colors = {}
  users.forEach(user => {
    colors[user] = '#' + (color -= step).toString(16)
  })

  return colors
}

// function get4Colors(color, step) {
//   let color = parseInt(color, 16)
//   let colors = []
//   for (counter = 0; counter < 3; counter++) {
    
//   }
// }

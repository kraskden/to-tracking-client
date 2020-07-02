import React, {
  Fragment
} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


export default function MultipleBarDiagram(props) {
  return (
    <>
      {
        props.barData !== null
        ? <Charts barData={props.barData} currentUser={props.currentUser} />
        : null
      }
    </>
  )
}

function Charts({barData, currentUser}) {
  return barData.map(([dataKey, data], index) => {
    const height = calcHeight(data.length)
    const sorted = [...data].sort((first, second) => {
      if (first[dataKey] < second[dataKey]) {
        return 1
      }
      if (first[dataKey] > second[dataKey]) {
        return -1
      }
        return 0
    })

    return (
      <Fragment>
        <h4>{dataKey}</h4>
        <ResponsiveContainer
          width="100%"
          height={height}
          key={index}>
          <BarChart
            width={400}
            data={sorted}
            layout="vertical"
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar
              dataKey={dataKey}
              fill={"#8884d8"}
            />
          </BarChart>
        </ResponsiveContainer>
      </Fragment>
    )
  })
}

const calcHeight = length => ((length * 30) + 30 + 24) // + height of xaxis and legend

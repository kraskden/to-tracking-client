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
        props.diagramData !== null
        ? <Charts diagramData={props.diagramData} currentUser={props.currentUser} />
        : null
      }
    </>
  )
}

function Charts({diagramData}) {
  return diagramData.map(([dataKey, data], index) => {
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
        {/* <h4>{dataKey}</h4> */}
        <ResponsiveContainer
          width="100%"
          height={height}
          key={index}
          // className="card p-3"  
        >
          <BarChart
            // width={400}
            data={sorted}
            layout="vertical"
            margin={{top: 5, right: 70, left: 70, bottom: 5}}
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

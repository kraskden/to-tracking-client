import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


export default function MultipleBarDiagram({diagramData}) {
  return (
    <>
      {
        diagramData !== null
        ? <Charts diagramData={diagramData} />
        : null
      }
    </>
  )
}

function Charts({diagramData}) {
  return diagramData.map(({dataName, data}, index) => {
    const height = calcHeight(data.length)
    const sorted = [...data].sort((first, second) => {
      if (first[dataName] < second[dataName]) {
        return 1
      }
      if (first[dataName] > second[dataName]) {
        return -1
      }
        return 0
    })

    return (
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
            <XAxis
              type="number"
              // unit=" u"
              // name="name"
            />
            <YAxis
              dataKey="name"
              type="category"
              // unit="u"
              // name="name"
            />
            <Tooltip />
            <Bar
              dataKey={dataName}
              fill={"#8884d8"}
            />
          </BarChart>
        </ResponsiveContainer>
    )
  })
}

const calcHeight = length => ((length * 30) + 30 + 24) // + height of xaxis and legend

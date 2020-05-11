import React, { Component } from 'react'
import {VictoryPie} from 'victory' 

export default class PieDiagram extends Component {
  render() {

    return (
      <svg width="400" height="400" role="img" viewBox="0 0 400 400" style={{"pointerEvents": "all", width: "100%", height: "80%"}} >
        <VictoryPie 
        data={[
          {x: "Striker", y: 100},
          {x: "Vulkan", y: 50},
          {x: "Firebird", y: 50},
          {x: "Another", y: 50},
          {x: "Shitty", y: 50},
        ]}
        style={{labels: {
          fontSize: 20
        }}}
        standalone={false}
      />
      </svg>
      
    )
  }
}
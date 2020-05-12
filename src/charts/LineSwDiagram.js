import React, { Component } from 'react'
import SwitchDiagram from './SwitchDiagram'
import LineDiagram from './LineDiagram'

export default class LineSwDiagram extends Component {
    render() {
        return (
            <SwitchDiagram graph={LineDiagram} periods={this.props.periods} />
        )
    }
}

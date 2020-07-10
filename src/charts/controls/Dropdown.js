import React, { Component } from 'react'


export default class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.values[0]
        }
        if (this.props.values[0])
            this.props.onChange(this.props.values[0].id)
    }

    // compare by key
    compareArrays(arr1, arr2, key) {
        if (arr1.length !== arr2.length) {
            return false
        }
        for (let i = 0; i < arr1.length; ++i) {
            if (arr1[i][key] !== arr2[i][key]) {
                return false;
            }
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.values !== this.props.values) {
            if (this.compareArrays(this.props.values, prevProps.values, 'id')) {
                return 
            }
            this.setState({
                value: this.props.values[0]
            })
            if (this.props.values[0])
                this.props.onChange(this.props.values[0].id)
        }
    }

    onChange = (val) => {
        this.setState({
            value: val
        })
        this.props.onChange(val.id)
    }

    render() {
        let items = this.props.values.map((val) => {
            return (
                // Line 50:112:  Script URL is a form of eval  no-script-url
                // eslint-disable-next-line no-script-url
                <button
                    className="dropdown-item"
                    id={val.id}
                    key={val.id}
                    onClick={() => this.onChange(val)}
                    // href="javascript:;"
                >{val.name}</button>
            )
        })
        return (
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {this.state.value ? this.state.value.name : "No such data"} 
                </button>
                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    {items}
                </div>
            </div>    
        )
    }
}

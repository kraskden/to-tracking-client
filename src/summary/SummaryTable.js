import React from 'react'

function PropertyTable(props) {
    let items = props.obj.map((el) => {
        return (
            <li key={el[0]} >
                <div className='property-key'>{el[0]}</div>
                <div className='property-spacer mx-1'></div>
                <div className='property-value'>{el[1]}</div>
            </li>
        )
    })
    return (
        <ul className="property-table pl-0">
            {items}
        </ul>
    )
}


export default function SummaryTable(props) {
    return (
        <div className="summary-table mt-3 row">
            <div className="col-6">
                <PropertyTable obj={props.objs[0]} />
            </div>
            <div className="col-6">
                <PropertyTable obj={props.objs[1]} />
            </div>
        </div>
    )
}
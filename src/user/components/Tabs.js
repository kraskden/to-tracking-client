import React from 'react'
// import { Link, useLocation } from 'react-router-dom'

export default function Tabs({onTabChange}) {

  const tabs = [
    { tab: "home", name: "Home" },
    { tab: "summary", name: "Summary" },
    { tab: "monitoring", name: "Monitoring" },
    { tab: "compare", name: "Compare" },
  ]

  // const location = useLocation()
  // console.log(location.pathname)
  // const path = location.pathname

  const createTabs = tabs => (
    tabs.map(({tab, name}, index) => {
      if (isActive(tab)) {
        return (
          <li
            className="nav-item"
            key={index}  
          >
            {/* <Link
              to={`${path}/${tab}`}
              className="nav-link active"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
            >
              {name}
            </Link> */}
            <button
              className="nav-link active"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              onClick={() => onTabChange(tab)}
            >
              {name}
            </button>
          </li>
        )
      }

      return (
        <li
          className="nav-item"
          key={index}
        >
          {/* <Link
            to={`${path}/${tab}`}
            className="nav-link"
            data-toggle="tab"
            role="tab"
            aria-selected="false"
          >
            {name}
          </Link> */}
          <button
            className="nav-link"
            data-toggle="tab"
            role="tab"
            aria-selected="false"
            onClick={() => onTabChange(tab)}
          >
            {name}
          </button>
        </li>
      )
    })
  )
  
  const isActive = tab => tab === "home" ? true : false

  return (
    <ul
      className="nav nav-tabs mt-2"
      id="myTab"
      role="tablist"
    >
      { createTabs(tabs) }
    </ul>
  )
}

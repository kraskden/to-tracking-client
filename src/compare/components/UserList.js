import React, { Fragment } from 'react'
import { Delete } from 'react-feather'
import { Link } from 'react-router-dom'

export default function UserList({users, delCallback}) {
  return (
    <Fragment>
      <h4>Users</h4>
      <ul className="list-group mt-3 mb-3">
        {
          users.map((user, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              {/* <span>{user.login}</span> */}
              <Link to={`/user/${user.login}`}>{user.login}</Link>
              <span
                onClick={e => delCallback(index)}
                className="span-hover"
              >
                <Delete />
              </span>
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

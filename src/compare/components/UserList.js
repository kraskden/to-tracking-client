import React, { Fragment } from 'react'
import { Delete } from 'react-feather'

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
              <span>{user.login}</span>
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

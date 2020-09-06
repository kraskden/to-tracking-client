import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import paginationFactory from 'react-bootstrap-table2-paginator';
import AccountsApi from '../net/AccountsApi';
import Util from '../util/Util'

const { SearchBar } = Search;

function timeFormatter(time) {
  return time ? Math.round(time / 3600 * 10) / 10 : 0;
}

const columns = [
  {
    dataField: 'login',
    text: 'Login',
    sort: true,
    formatter: (cell) => <a href={`/user/${cell}`}>{cell}</a>
  }, {
    dataField: 'state.rank',
    text: 'Rank',
    sort: true,
    formatter: (cell) => <span>{Util.getRankFromNumber(cell)}</span>
  },
  {
    dataField: 'currWeek.time',
    text: 'Week h',
    sort: true,
    formatter: (cell) => <span>{timeFormatter(cell)}</span>,
    headerStyle: () => ({width: '10%'})
  }, {
    dataField: 'currMonth.time',
    text: 'Month h',
    sort: true,
    formatter: (cell) => <span>{timeFormatter(cell)}</span>,
    headerStyle: () => ({width: '10%'})
  }, {
    dataField: 'weekly.time',
    text: 'Prev week h',
    sort: true,
    formatter: (cell) => <span>{timeFormatter(cell)}</span>,
    headerStyle: () => ({width: '13%'})
  }, {
    dataField: 'monthly.time',
    text: 'Prev month h',
    sort: true,
    formatter: (cell) => <span>{timeFormatter(cell)}</span>,
    headerStyle: () => ({width: '13%'})
  }]

function UserTable(props) {

  const [users, setUsers] = useState([])

  useEffect(() => {
    AccountsApi.getAllAccounts().then((users) => {
      setUsers(users.map(user => {
        user.weekly = user.weekly[0] || {}
        user.monthly = user.monthly[0] || {}
        return user;
      }))
    })
  }, [])


  return (
    <div className="mt-2 mb-5">
      <ToolkitProvider keyField='login' columns={columns} data={users} bootstrap4={true} search={true}>
        {props => (
          <>
            <SearchBar {...props.searchProps} />
            <BootstrapTable defaultSorted={[{dataField: 'currWeek.time', order: 'desc'}]}  wrapperClasses="table-responsive"
             {...props.baseProps} striped pagination={paginationFactory({ sizePerPage: 20, showTotal: true })} />
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

UserTable.propTypes = {

}

export default UserTable


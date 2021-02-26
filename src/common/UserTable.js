import React, { useEffect, useState } from 'react'
import PropTypes, { func } from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import paginationFactory from 'react-bootstrap-table2-paginator';
import AccountsApi from '../net/AccountsApi';
import Util from '../util/Util'

import Switch from '../user/components/Switch'

const { SearchBar } = Search;

function timeFormatter(time) {
  return time ? Math.round(time / 3600 * 10) / 10 : 0;
}

function getColumn(field, text, width, fmt) {
  let col =  {
    dataField: field,
    text: text || field,
    sort: true,
    formatter: fmt || ((cell) => <span>{cell}</span>),
  }
  if (width) {
    col.headerStyle = () => ({width: width})
  }
  return col;
}

const baseColumns = [
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
  }
]

function getExtraColumns(key, fmt) {
  const keyPrefixes = ["currWeek", "currMonth", "weekly", "monthly"]
  const columnNames = ["Week", "Month", "Prev week", "Prev month"]
  const columnWidth = ['10%', '10%', '13%', '13%']
  return keyPrefixes.map((prefix, idx) => (
    getColumn(`${prefix}.${key}`, columnNames[idx], columnWidth[idx], fmt)
  ))
}

function doubleFmt(invalidVal, precision) {
  return (cell) => {
    const num = parseFloat(cell)
    if (num == invalidVal) {
      return <span>-</span>
    }
    return <span>{Math.round(num * precision) / precision}</span>
  }
}

const extraColumnsMap = {
  time: getExtraColumns('time', (cell) => <span>{timeFormatter(cell)}</span>),
  kd: getExtraColumns('kd', doubleFmt(-1, 100)),
  kt: getExtraColumns('kt', doubleFmt(-1, 1))
}

function UserTable(props) {

  const [users, setUsers] = useState([])
  const [extraColumnId, setExtraColumnId] = useState("kt")

  useEffect(() => {
    AccountsApi.getAllAccounts().then((users) => {
      setUsers(users.map(user => {
        user.weekly = user.weekly[0] || {};
        user.monthly = user.monthly[0] || {};
        ["weekly", "monthly", "currWeek", "currMonth"].forEach(prefix => {
          const entry = user[prefix] || {};
          entry.kd = entry.deaths ? entry.kills / entry.deaths : -1;
          entry.kt = entry.time ? entry.kills / (entry.time / 3600) : -1;
          user[prefix] = entry
        })
        return user;
      }))
    })
  }, [])


  return (
    <div className="mt-2 mb-xl-5 mb-1">
      <ToolkitProvider keyField='login' columns={[...baseColumns, ...extraColumnsMap[extraColumnId]]} data={users} bootstrap4={true} search={true}>
        {props => (
          <>
            <div className="row mt-4">
              <div className="col">
                <Switch switches={[{id: "kt", name: "Kills/Hour"}, {id: "time", name: "Hours"}, {id: "kd", name: "K/D"}]} 
                  onChange={(e) => setExtraColumnId(e.target.id)} defId="kt" />

              </div>
              <div className="col align-self-end justify-content-end">
                <div className="d-flex justify-content-end mb-2">
                  <SearchBar {...props.searchProps} />

                </div>
              </div>
             
            </div>
            <BootstrapTable defaultSorted={[{dataField: `currWeek.${extraColumnId}`, order: 'desc'}]}  wrapperClasses="table-responsive"
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


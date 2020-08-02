import React, {useState} from 'react'
import AuthApi from '../net/AuthApi'

export default function AdminPage(props) {

    const [prefix, setPrefix] = useState("/")
    const [command, setCommand] = useState("")
    const [result, setResult] = useState("")

    function onSubmit(e) {
        e.preventDefault()
        AuthApi.authGetReq(prefix + command).then((data) => {
            setResult(data)
        }).catch((ex) => {
            setResult("ERROR")
        })
        setCommand("")
    }

    function onChange(e) {
        setCommand(e.target.value);
        setResult("")
    }


    return (
        <div className="card w-100 mt-2">
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-row">
                        <select className="custom-select" value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                            <option value="/">/</option>
                            <option value="/add/">Add</option>
                            <option value="/invite/">Invite</option>
                        </select>
                    </div>

                    <div className="form-row mt-3">
                        <input type="text" className="w-100" value={command} onChange={onChange} autoFocus />
                    </div>

                </form>
            </div>
            <div className="card-footer">
                <p>
                    {result}
                </p>
            </div>
        </div>
    )
}
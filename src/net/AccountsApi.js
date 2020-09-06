import serverUrl from './config'


const AccountsApi = {}

AccountsApi.getAllAccounts = async () => {
  let res = await fetch(`${serverUrl}/users`)
  return await res.json()  
}

export default AccountsApi
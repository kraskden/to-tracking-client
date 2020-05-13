import serverUrl from './config'


let AuthApi = {}

AuthApi.login = async (login, password) => {
    let res = await fetch(`${serverUrl}/profile/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
    if (res.status !== 200) {
        return Promise.reject()
    }
    let msg = await res.json()
    if (msg.jwt) {
        localStorage.setItem('RTG_JWT', msg.jwt)
        return Promise.resolve()
    } else {
        return Promise.reject()
    }
}

AuthApi.logout = () => {
    localStorage.removeItem('RTG_JWT')
}

AuthApi.register = async (login, password, invite) => {
    let res = await fetch(`${serverUrl}/profile/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password,
            invite: invite
        })
    })
    if (res.status == 200) {
        return Promise.resolve()
    } else {
        return Promise.reject()
    }
}

// Retrive user information
AuthApi.getUserInfo = async () => {
    let token = localStorage.getItem('RTG_JWT')
    if (token === null) {
        return Promise.reject()
    }
    let res = await fetch(`${serverUrl}/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (res.status !== 200) {
        return Promise.reject()
    } else {
        return await res.json()
    }
}

export default AuthApi
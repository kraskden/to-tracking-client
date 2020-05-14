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

let postSub = async (url) => {
    let token = localStorage.getItem('RTG_JWT')
    if (token === null) {
        return Promise.reject()
    }
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (res.status !== 200) {
        return Promise.reject()
    }
    return Promise.resolve()
}

AuthApi.subTo = async (user) => {
    return postSub(`${serverUrl}/profile/sub/${user}`)
}

AuthApi.unsubFrom = async (user) => {
    return postSub(`${serverUrl}/profile/unsub/${user}`)
}

AuthApi.addAccount = async (login, invite) => {
    let token = localStorage.getItem('RTG_JWT')
    let res = await fetch(`${serverUrl}/profile/add/${login}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            invite: invite
        })
    })
    if (res.status !== 200 ) {
        return Promise.reject()
    } else {
        return Promise.resolve()
    }
}


export default AuthApi
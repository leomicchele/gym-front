export const setSessionStorage = (user) => {
    localStorage.setItem('Auth_token', JSON.stringify(user));
}

export const getSessionStorage = () => {
    return JSON.parse(localStorage.getItem('Auth_token'))
}
export const removeSessionStorage = () => {
    return localStorage.removeItem('Auth_token')
}
// export const setSessionStorage = (user) => {
//     sessionStorage.setItem('Auth_token', JSON.stringify(user));
// }

// export const getSessionStorage = () => {
//     return JSON.parse(sessionStorage.getItem('Auth_token'))
// }
// export const removeSessionStorage = () => {
//     return sessionStorage.removeItem('Auth_token')
// }

const AUTH_TOKEN = 'AUTH_TOKEN'

export const setToken = (token) => localStorage.setItem(AUTH_TOKEN, token)
export const getToken = () => localStorage.getItem(AUTH_TOKEN)
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN)

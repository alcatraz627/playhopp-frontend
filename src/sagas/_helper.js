const AUTH_TOKEN = 'AUTH_TOKEN'
// const CART_ITEMS = 'CART_ITEMS'
// TODO: Localstorage cart

export const setToken = (token) => localStorage.setItem(AUTH_TOKEN, token)
export const getToken = () => localStorage.getItem(AUTH_TOKEN)
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN)

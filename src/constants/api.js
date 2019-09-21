import * as actions from '../actions'

let apiUrl = (mode == 'development') ? `http://localhost:8000/api` : `http://13.127.132.188/api`
// let apiUrl = `http://13.127.132.188/api`
// let apiUrl = `http://localhost:8000/api`

console.log(mode);

export const apiRoutes = {
    TOYS: () => `${apiUrl}/toys/`,
    TOY: (id) => `${apiUrl}/toys/${id}/`,

    BRANDS: () => `${apiUrl}/brands/`,
    CATEGORIES: () => `${apiUrl}/categories/`,

    USERS: (username) => `${apiUrl}/customers/`,
    USER: (username) => `${apiUrl}/customers/${username}/`,
    GET_USER: () => `${apiUrl}/customers/get_user/`,

    SIGNUP: () => `${apiUrl}/customers/`,
    LOGIN: () => `${apiUrl}/token_login/`,
}

export const API_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
}

export const API_STATES = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    NOT_FOUND: 'NOT_FOUND',
    FETCHED: 'FETCHED',
    ERROR: 'ERROR',
}

export const API_DATA_TYPE = {
    TOY: 'toy',
    TOYS: 'toys',
    USER: 'user',
    USERS: 'users',
    LOGIN: 'login',
    SIGNUP: 'signup',
    BRANDS: 'brands',
    CATEGORIES: 'categories',
}

export const API_DATA_TYPE_REDUCER = {
    [API_DATA_TYPE.TOYS]: actions.addToys,
    [API_DATA_TYPE.TOY]: actions.addToy,
    [API_DATA_TYPE.BRANDS]: actions.addBrands,
    [API_DATA_TYPE.CATEGORIES]: actions.addCategories,
    [API_DATA_TYPE.USER]: actions.setUser,
    [API_DATA_TYPE.USERS]: actions.setUsers,

    [API_DATA_TYPE.LOGIN]: actions.loginSuccess,
    [API_DATA_TYPE.SIGNUP]: actions.signupSuccess,

}
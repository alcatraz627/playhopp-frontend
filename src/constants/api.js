import * as actions from '../actions'

let apiUrl = `http://35.154.205.76/api`


export const apiRoutes = {
    TOYS: () => `${apiUrl}/toys/`,
    TOY: (id) => `${apiUrl}/toys/${id}/`,

    BRANDS: () => `${apiUrl}/brands/`,
    CATEGORIES: () => `${apiUrl}/categories/`,

    PROFILE: (username) => `${apiUrl}/customers/${username}/`,

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
    LOGIN: 'login',
    REGISTER: 'register',
    BRANDS: 'brands',
    CATEGORIES: 'categories',
}

export const API_DATA_TYPE_REDUCER = {
    [API_DATA_TYPE.TOYS]: actions.addToys,
    [API_DATA_TYPE.TOY]: actions.addToy,
    [API_DATA_TYPE.BRANDS]: actions.addBrands,
    [API_DATA_TYPE.CATEGORIES]: actions.addCategories,

    [API_DATA_TYPE.LOGIN]: actions.loginSuccess,

}
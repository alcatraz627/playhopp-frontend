import * as actions from '../actions'

const h = window.location.hostname
const p = '8000'

export const apiRoutes = {
    TOYS: () => `//${h}:${p}/toys/`,
    TOY: (id) => `//${h}:${p}/toys/${id}/`,

    BRANDS: () => `//${h}:${p}/brands/`,
    CATEGORIES: () => `//${h}:${p}/categories/`,

    PROFILE: (username) => `//${h}:${p}/customers/${username}/`,

    SIGNUP: () => `//${h}:${p}/customers/`,
    LOGIN: () => `//${h}:${p}/token_login/`,
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
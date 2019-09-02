import * as actions from '../actions'

export const apiRoutes = {
    TOYS: () => `//localhost:8000/toys/`,
    TOY: (id) => `//localhost:8000/toys/${id}/`,

    BRANDS: () => `//localhost:8000/brands/`,
    CATEGORIES: () => `//localhost:8000/categories/`,

    PROFILE: (username) => `//localhost:8000/customers/${username}/`,

    SIGNUP: () => `//localhost:8000/customers/`,
    LOGIN: () => `//localhost:8000/token_login/`,
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
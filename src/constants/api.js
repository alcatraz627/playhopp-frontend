import * as actions from '../actions'

export const apiRoutes = {
    TOYS: () => `//localhost:8000/toys/`,
    TOY: (id) => `//localhost:8000/toys/${id}/`,

    BRANDS: () => `//localhost:8000/brands/`,
    CATEGORIES: () => `//localhost:8000/categories/`,
}

export const API_STATES = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
    ERROR: 'ERROR',
}

export const API_DATA_TYPE = {
    TOYS: 'toys',
    TOY: 'toy',
    USER: 'user',
    BRANDS: 'brands',
    CATEGORIES: 'categories',
    // SUBSCRIPTION: 'subscriptio'
}

export const API_DATA_TYPE_REDUCER = {
    [API_DATA_TYPE.TOYS]: actions.addToys,
    [API_DATA_TYPE.TOY]: actions.addToy,
    [API_DATA_TYPE.BRANDS]: actions.addBrands,
    [API_DATA_TYPE.CATEGORIES]: actions.addCategories,
}
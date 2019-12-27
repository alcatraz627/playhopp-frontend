import * as actions from '../actions'

// export const apiUrl =  `http://13.127.132.188/api`
export const apiUrl = (__MODE__ == 'development') ? `http://localhost:8000/api` : `http://13.127.132.188/api`

export const getCardImage = (id, k = 1) => (`${apiUrl}/media/toys/${id}/${k}.jpg`)

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

    HOPPLIST: {
        CURRENT: () => `${apiUrl}/hopplist/current/`,
        LIST: () => `${apiUrl}/hopplist/`,
        ADD: () => `${apiUrl}/hopplist/add/`,
        REMOVE: () => `${apiUrl}/hopplist/remove/`,
        EMPTY: () => `${apiUrl}/hopplist/empty/`,
    },
    SUBSCRIPTION: () => `${apiUrl}/subscription/`,
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
    TOYS: 'toys',
    BRANDS: 'brands',
    CATEGORIES: 'categories',

    USER: 'user',
    LOGIN: 'login',
    SIGNUP: 'signup',
    HOPPLIST: 'hopplist',
    CARTITEM: 'cartitem',

    SUBSCRIPTION: 'subscription',
}

export const API_DATA_TYPE_REDUCER = {
    [API_DATA_TYPE.TOYS]: actions.addToys,
    [API_DATA_TYPE.BRANDS]: actions.addBrands,
    [API_DATA_TYPE.CATEGORIES]: actions.addCategories,
    [API_DATA_TYPE.USER]: actions.setUser,
    [API_DATA_TYPE.HOPPLIST]: actions.cartFill,
    [API_DATA_TYPE.SUBSCRIPTION]: actions.submitSubscription,

    [API_DATA_TYPE.LOGIN]: actions.loginSuccess,
    [API_DATA_TYPE.SIGNUP]: actions.signupSuccess,

}
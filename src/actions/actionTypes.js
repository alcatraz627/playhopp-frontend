import {createAction} from 'redux-starter-kit';

// Offline actions
export const CART_ADD = createAction('cart/add')
export const CART_REMOVE = createAction('cart/remove')


// App actions
export const TOGGLE_DRAWER = createAction('general/cart_drawer/toggle')
export const SET_NOTIF = createAction('general/notif')


// API actions
export const API_CALL = createAction('api/call')
export const API_RESPONSE = createAction('api/response')

// Item Actions
export const ADD_TOY = createAction('toy/add/single')
export const ADD_TOYS = createAction('toy/add/collection')

export const ADD_BRANDS = createAction('brand/add/collection')
export const ADD_CATEGORIES = createAction('category/add/collection')

export const SET_USER = createAction('user/set')

export const LOGIN_SUCCESS = createAction('auth/login/success')
export const LOGIN_FAIL = createAction('auth/login/fail')

export const SIGNUP_SUCCESS = createAction('auth/signup/success')
export const SIGNUP_FAIL = createAction('auth/signup/fail')

import {createAction} from 'redux-starter-kit';

export const API_CALL = createAction('api/call')
export const API_RESPONSE = createAction('api/response')

export const ADD_TOY = createAction('toy/add/single')
export const ADD_TOYS = createAction('toy/add/collection')

export const ADD_BRANDS = createAction('brand/add/collection')
export const ADD_CATEGORIES = createAction('category/add/collection')
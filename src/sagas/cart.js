import { all, call, delay, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios'

import { history } from '../store'

import * as actionTypes from '../actions/actionTypes'

import { apiResponse } from '../actions'

import { API_STATES, API_DATA_TYPE, API_DATA_TYPE_REDUCER, API_METHODS, apiRoutes } from '../constants/api'
import routes from '../constants/routes'
import { setToken, getToken, deleteToken } from './_helper.js'


// TODO: If user not logged in, don't sync cart with backend and wait for register and then sync
export function* handleCardAdd({ payload }) {
    console.log(payload)
    let cart = yield select(state => state.cart)
    let cartLength = Object.keys(cart).length
    if (cartLength > 9) yield put(actionTypes.SET_NOTIF({ message: `Please Proceed to Payment` }))

    yield put(actionTypes.API_CALL({ route: apiRoutes.HOPPLIST.ADD(), dataType: API_DATA_TYPE.CARTITEM, method: API_METHODS.POST, data: { toy: payload.item } }))
}
export function* handleCardRemove({ payload }) {

    yield put(actionTypes.API_CALL({ route: apiRoutes.HOPPLIST.REMOVE(), dataType: API_DATA_TYPE.CARTITEM, method: API_METHODS.POST, data: { toy: payload.item } }))
}

export default function* root() {
    yield all([
        takeEvery(actionTypes.CART_ADD, handleCardAdd),
        takeEvery(actionTypes.CART_REMOVE, handleCardRemove),
    ])
}
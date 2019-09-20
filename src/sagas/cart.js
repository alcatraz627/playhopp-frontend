import { all, call, delay, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios'

import { history } from '../store'

import * as actionTypes from '../actions/actionTypes'

import { apiResponse } from '../actions'

import { API_STATES, API_DATA_TYPE, API_DATA_TYPE_REDUCER, API_METHODS, apiR } from '../constants/api'
import routes from '../constants/routes'
import { setToken, getToken, deleteToken } from './_helper.js'


export function* handleCardAdd({ payload }) {
    let cart = yield select(state => state.cart)
    let cartLength = Object.keys(cart).length
    if(cartLength > 9) yield put(actionTypes.SET_NOTIF({ message: `Please Proceed to Payment` }))
}

export default function* root() {
    yield all([
        takeEvery(actionTypes.CART_ADD, handleCardAdd),
    ])
}
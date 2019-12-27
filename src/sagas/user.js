import { all, call, delay, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios'

import { history } from '../store'

import * as actionTypes from '../actions/actionTypes'

import { apiResponse } from '../actions'

import { API_STATES, API_DATA_TYPE, API_METHODS, apiRoutes } from '../constants/api'
import routes from '../constants/routes'
import { setToken, getToken, deleteToken } from './_helper.js'


export function* handleLoginSuccess({ payload }) {
    yield call(history.push, routes.homepage)
    setToken(payload.token)
    yield put(actionTypes.SET_NOTIF({ message: `Logged in as ${payload.email}` }))
    yield put(actionTypes.API_CALL({ route: apiRoutes.HOPPLIST.CURRENT(), dataType: API_DATA_TYPE.HOPPLIST, auth: true }))
}

// TODO: Color of notif
export function* handleLoginFail({ payload }) {
    yield put(actionTypes.SET_NOTIF({ message: `Invalid Credentials` }))
}

export function* handleLogout({ payload }) {
    yield call(history.push, routes.homepage)
    deleteToken()
    yield put(actionTypes.SET_NOTIF({ message: `Logged out successfully` }))
    yield put(actionTypes.CART_EMPTY())
    // TODO: Empty cart
}

export function* handleSignupSuccess({ payload }) {
    yield call(history.push, routes.homepage)
    setToken(payload.data.token)
    yield put(actionTypes.SET_NOTIF({ message: `Registered as ${payload.data.email}` }))
}

export function* handleSignupFail({ payload }) {
    yield put(actionTypes.SET_NOTIF({ message: `Error. Please try refreshing the page.` }))
}

export function* handleUserSet({ payload }) {

    if (payload.status == 200) {
        console.log("Logged in!")
        yield put(actionTypes.API_CALL({ route: apiRoutes.HOPPLIST.CURRENT(), dataType: API_DATA_TYPE.HOPPLIST, auth: true }))
    } else {
        console.log("Failed to log in!")
        deleteToken()
    }
    // http://localhost:8000/api/hopplist/current/
    // yield put(actionTypes.SET_NOTIF({ message: `Error. Please try refreshing the page.` }))

}

export default function* root() {
    yield all([
        takeEvery(actionTypes.LOGIN_SUCCESS, handleLoginSuccess),
        takeEvery(actionTypes.LOGIN_FAIL, handleLoginFail),

        takeEvery(actionTypes.LOGOUT, handleLogout),

        takeEvery(actionTypes.SIGNUP_SUCCESS, handleSignupSuccess),
        takeEvery(actionTypes.SIGNUP_FAIL, handleSignupFail),

        takeEvery(actionTypes.SET_USER, handleUserSet),
    ])
}
import { all, call, delay, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios'

import { history } from '../store'

import * as actionTypes from '../actions/actionTypes'

import { apiResponse } from '../actions'

import { API_STATES, API_DATA_TYPE, API_DATA_TYPE_REDUCER, API_METHODS, apiR } from '../constants/api'
import routes from '../constants/routes'
import { setToken, getToken, deleteToken } from './_helper.js'


export function* handleLoginSuccess({ payload }) {
    yield call(history.push, routes.homepage)
    setToken(payload.token)
    yield put(actionTypes.SET_NOTIF({ message: `Logged in as ${payload.email}` }))
}

// TODO: Color of notif
export function* handleLoginFail({ payload }) {
    yield put(actionTypes.SET_NOTIF({ message: `Invalid Credentials` }))
}

export function* handleLogout({ payload }) {
    yield call(history.push, routes.homepage)
    yield put(actionTypes.SET_NOTIF({ message: `Logged out successfully` }))
}

export function* handleSignupSuccess({ payload }) {
    yield call(history.push, routes.homepage)
    setToken(payload.data.token)
    yield put(actionTypes.SET_NOTIF({ message: `Registered as ${payload.data.email}` }))
}

export function* handleSignupFail({ payload }) {
    yield put(actionTypes.SET_NOTIF({ message: `Error. Please try refreshing the page.` }))
}

export default function* root() {
    yield all([
        takeEvery(actionTypes.LOGIN_SUCCESS, handleLoginSuccess),
        takeEvery(actionTypes.LOGIN_FAIL, handleLoginFail),

        takeEvery(actionTypes.LOGOUT, handleLogout),

        takeEvery(actionTypes.SIGNUP_SUCCESS, handleSignupSuccess),
        takeEvery(actionTypes.SIGNUP_FAIL, handleSignupFail),
    ])
}
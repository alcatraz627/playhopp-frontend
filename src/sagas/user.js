import { all, call, delay, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios'

import {history} from '../store'

import * as actionTypes from '../actions/actionTypes'

import { apiResponse } from '../actions'

import { API_STATES, API_DATA_TYPE, API_DATA_TYPE_REDUCER, API_METHODS } from '../constants/api'
import routes from '../constants/routes'


export function* handleLoginSuccess({payload}) {
    yield call(history.push, routes.homepage)
    yield put(actionTypes.SET_NOTIF({message: `Logged in as ${payload.email}`}))
}

export function* handleLoginFail({payload}) {
    // yield call(history.push, routes.homepage)
    yield put(actionTypes.SET_NOTIF({message: `Credentials Invalid`}))
}

export default function* root() {
    yield all([
        takeEvery(actionTypes.LOGIN_SUCCESS, handleLoginSuccess),
        takeEvery(actionTypes.LOGIN_FAIL, handleLoginFail),

        // takeEvery(actionTypes.REGISTER_SUCCESS, handleRegisterSuccess),
        // takeEvery(actionTypes.REGISTER_FAIL, handleRegisterFail),
    ])
}
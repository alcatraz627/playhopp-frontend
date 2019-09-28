import { all, call, delay, takeEvery, select, put } from 'redux-saga/effects'
import axios from 'axios'

import * as actionTypes from '../actions/actionTypes'

import { apiResponse } from '../actions'

import { API_STATES, API_DATA_TYPE, API_DATA_TYPE_REDUCER, API_METHODS, apiRoutes } from '../constants/api'
import routes from '../constants/routes'
import { getToken } from './_helper'

axios.interceptors.response.use(response => response, error => error.response)

const requestMethod = {
    [API_METHODS.GET]: axios.get,
    [API_METHODS.POST]: axios.post,
    [API_METHODS.PATCH]: axios.patch,
    [API_METHODS.DELETE]: axios.delete,
}


export function* apiCall({ payload: { route, dataType, method, data } }) {
    let user = yield select(state => state.user)
    let headers = {}
    let responseType
    let resp

    let token = user.token || getToken();

    (!['null', 'undefined', null, undefined].includes(token)) && (headers['Authorization'] = `Token ${token}`)

    try {

        let config = {
            method: (method || API_METHODS.GET).toLowerCase(),
            url: route,
            headers,
            data: data || null,
        }
        // console.log('config', config)
        resp = yield call(axios, config)

        // if ([API_METHODS.POST, API_METHODS.PATCH, null].includes(method)) {
        //     resp = yield call(requestMethod[method || API_METHODS.GET], route, data || null, { headers })
        // } else {
        //     resp = yield call(requestMethod[method || API_METHODS.GET], route, { headers })
        // }

        console.info('resp', resp)

        switch (resp.status) {
            case 201:
            case 200:
            case 204:
                responseType = API_STATES.FETCHED
                break;
            case 404:
                responseType = API_STATES.NOT_FOUND
                break;
            case 400:
            case 401:
            case 403:
            case 500:
            default:
                responseType = API_STATES.ERROR
                break;
        }
    } catch (error) {
        console.error('Err', error)
    }

    yield put(actionTypes.API_RESPONSE({
        dataType,
        responseType
    }))
    switch (route) {
        case apiRoutes.LOGIN():
            yield put(((responseType == API_STATES.FETCHED) ? actionTypes.LOGIN_SUCCESS : actionTypes.LOGIN_FAIL)({ ...resp.data }))
            break;
        case apiRoutes.SIGNUP():
            yield put(((responseType == API_STATES.FETCHED) ? actionTypes.SIGNUP_SUCCESS : actionTypes.SIGNUP_FAIL)({ ...resp.data }))
            break;
        case apiRoutes.HOPPLIST.ADD():
        case apiRoutes.HOPPLIST.REMOVE():
            // yield put(actionTypes.CART_ADD({...resp.data}))
            break;
        default:
            yield put(API_DATA_TYPE_REDUCER[dataType](resp.data))
            break;
    }

}

export default function* root() {
    yield all([
        takeEvery(actionTypes.API_CALL, apiCall),
    ])
}
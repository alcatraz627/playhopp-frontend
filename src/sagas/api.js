import { all, call, delay, takeEvery, select, put} from 'redux-saga/effects'
import axios from 'axios'

import * as actionTypes from '../actions/actionTypes'

import {apiResponse} from '../actions'

import {API_STATES, API_DATA_TYPE, API_DATA_TYPE_REDUCER} from '../constants/api'

axios.interceptors.response.use(response => response, error => error.response)

const requestMethod = {
    GET: axios.get,
    POST: axios.post,
    PATCH: axios.patch,
    DELETE: axios.delete,
}


export function* apiCall({payload: {route, dataType}}) {
    let header, responseType, resp;
    // console.log('From Saga', route, dataType);
    // (user.authStatus == AUTH_STATUS.LOGGED_IN) && (headers['Authorization'] = `HOGWORTS ${user.access}`);

    try {
        resp = yield call(
            requestMethod.GET,
            route, // url generated with all the url params
            // request.payload,{ headers }
            );

            console.log('resp', resp)

            switch (resp.status) {
                case 200:
                case 201:
                case 204:
                    responseType = API_STATES.FETCHED
                    break
                case 404:
                    responseType = API_STATES.NOT_FETCHED
                    break
                case 403:
                case 401:

                case 500:
                default:
                    responseType = API_STATES.ERROR
                    break
            }
        } catch (error) {
            console.log('Err', error)
        }

        yield put(actionTypes.API_RESPONSE({dataType, responseType}))
        yield put(API_DATA_TYPE_REDUCER[route, dataType](resp.data))

}

export default function* root() {
    yield all([
        takeEvery(actionTypes.API_CALL, apiCall),
    ])
}
import {all, fork, put} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {apiRoutes, API_DATA_TYPE} from '../constants/api'

import api from './api'

function* boot() {
    yield put(actionTypes.API_CALL({route: apiRoutes.BRANDS(), dataType: API_DATA_TYPE.BRANDS}))
    yield put(actionTypes.API_CALL({route: apiRoutes.CATEGORIES(), dataType: API_DATA_TYPE.CATEGORIES}))
}

export default function* root() {
    yield all([
        fork(boot),
        fork(api),
    ])
}
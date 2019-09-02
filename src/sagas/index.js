import {all, fork, put} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {apiRoutes, API_DATA_TYPE} from '../constants/api'

import api from './api'
import user from './user'

function* boot() {
    yield put(actionTypes.API_CALL({route: apiRoutes.BRANDS(), dataType: API_DATA_TYPE.BRANDS}))
    yield put(actionTypes.API_CALL({route: apiRoutes.CATEGORIES(), dataType: API_DATA_TYPE.CATEGORIES}))
    yield put(actionTypes.API_CALL({route: apiRoutes.TOYS(), dataType: API_DATA_TYPE.TOYS}))

    yield put(actionTypes.SET_NOTIF({message: "Henlo"}))
}

export default function* root() {
    yield all([
        fork(boot),
        fork(api),
        fork(user),
    ])
}
import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

export default createReducer(0, {
    [actionTypes.ADD_TOYS]: (state, action) => ({
        ...state,
        ..._.chain(action.payload.data).keyBy('id').value()
    }),

})
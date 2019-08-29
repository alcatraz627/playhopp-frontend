import { createReducer } from 'redux-starter-kit'
import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

export default createReducer(0, {
    // [actionTypes.ADD_TOY]: (state, action) => ([...state, {...action.payload.data}]),

    [actionTypes.ADD_TOYS]: (state, action) => ({
        ...state,
        ..._.chain(action.payload.data).keyBy('id').value()
    }),

    // [actionTypes.ADD_TOYS]: (state, action) => {
    //     console.log(action)
    //     return state
    // },

})
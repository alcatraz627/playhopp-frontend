import {
    createReducer
} from 'redux-starter-kit';
import * as actionTypes from '../actions/actionTypes';

export default createReducer(0, {
    [actionTypes.ADD_TOY]: (state, action) => ([
        ...state,
        {
            id: (state.length + 1),
            ...action.payload.data
        }
    ])
})
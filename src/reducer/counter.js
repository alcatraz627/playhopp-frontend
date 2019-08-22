import { createReducer } from 'redux-starter-kit';
import * as actionTypes from '../actions/actionTypes';

export default createReducer(0, {
    [actionTypes.UPDATE_COUNTER]: (state, action) => action.payload.counter
})

// export const counterReducer = (state = 0, action) => {
//     switch (action.type) {
//         case UPDATE_COUNTER:
//             return {
//                 ...state, counter: action.payload.counter
//             }
//             default:
//                 return state;
//     }
// }

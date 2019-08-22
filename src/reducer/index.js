import {combineReducers} from 'redux';
import {UPDATE_COUNTER} from '../actions/actionTypes';
import counter from './counter';

const rootReducer = combineReducers({
    // counter: counterReducer
    counter
})

// console.log(counterReducer());

export default rootReducer;
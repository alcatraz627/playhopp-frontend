import {combineReducers} from 'redux';
import {UPDATE_COUNTER} from '../actions/actionTypes';
import counter from './counter';
import toys from './toys';

const rootReducer = combineReducers({
    // counter: counterReducer
    counter,
    toys
})

// console.log(counterReducer());

export default rootReducer;
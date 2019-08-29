import {combineReducers} from 'redux';

import api from './api';
import toys from './toys';
import brands from './brands';
import categories from './categories';

const rootReducer = () => combineReducers({
    // counter: counterReducer
    api,
    toys,
    brands,
    categories,

})

// console.log(counterReducer());

export default rootReducer;
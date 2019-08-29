import {combineReducers} from 'redux';

import api from './api';
import toys from './toys';
import brands from './brands';
import categories from './categories';
import cart from './cart';

const rootReducer = () => combineReducers({
    // counter: counterReducer
    api,
    toys,
    brands,
    categories,
    cart,

})

// console.log(counterReducer());

export default rootReducer;
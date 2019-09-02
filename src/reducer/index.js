import {combineReducers} from 'redux';

import api from './api';
import toys from './toys';
import brands from './brands';
import categories from './categories';
import cart from './cart';
import general from './general';
import user from './user';

const rootReducer = () => combineReducers({
    // counter: counterReducer
    api,
    toys,
    brands,
    categories,
    cart,
    general,
    user,

})

// console.log(counterReducer());

export default rootReducer;
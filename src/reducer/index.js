import {combineReducers} from 'redux';

import api from './api';
import brands from './brands';
import cart from './cart';
import categories from './categories';
import general from './general';
import toys from './toys';
import user from './user';

const rootReducer = () => combineReducers({
    api,
    brands,
    cart,
    categories,
    general,
    user,
    toys,
})

export default rootReducer;
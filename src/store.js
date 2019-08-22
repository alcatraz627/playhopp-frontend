import {createStore} from 'redux';
import { configureStore } from 'redux-starter-kit';
import { devToolsEnhancer} from 'redux-devtools-extension';
import initialState from './constants/initialState';
import reducer from './reducer';

// console.log(reducer);

// const store = configureStore({
//     reducer,
//     middleware: [devToolsEnhancer],
//     devTools: true,
//     preloadedState: initialState,
// })

const store = createStore(reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
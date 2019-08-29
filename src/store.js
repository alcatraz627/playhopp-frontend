import 'regenerator-runtime/runtime'
import {createStore, applyMiddleware, compose} from 'redux';
import { configureStore } from 'redux-starter-kit';
import { devToolsEnhancer} from 'redux-devtools-extension';
import initialState from './constants/initialState';
import createRootReducer from './reducer';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas'
// console.log(reducer);

export const sagaMiddleWare = createSagaMiddleWare()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = configureStore({
//     reducer: createRootReducer(),
//     preloadedState: initialState,
//     middleware: [devToolsEnhancer, sagaMiddleWare],
//     devTools: true,
// })

const store = createStore(createRootReducer(), initialState,
     composeEnhancers(applyMiddleware(sagaMiddleWare))
);
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
export default store;

export const sagaTask = sagaMiddleWare.run(function* () {
    yield rootSaga();
})
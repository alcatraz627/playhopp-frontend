import React from 'react'
import ReactDOM from 'react-dom'

// import {hot} from 'react-hot-loader/root'

import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

import { AppContainer } from 'react-hot-loader';

import './styles/global.scss';


const render = () => ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>
    , document.getElementById('root'))

render()

console.log('hot', module.hot)
if (module.hot) {
    module.hot.accept('./components/App', () => { render() });
    // module.hot.accept('./redux/reducers', () => { store.replaceReducer(require('./redux/reducers/index')) });
    // module.hot.accept('./sagas', () => {
    //     const getNewSagas = require('./sagas');
    //     sagaTask.cancel()
    //     sagaTask.done.then(() => {
    //         sagaTask = sagaMiddleware.run(function* replacedSaga(action) {
    //             yield getNewSagas()
    //         })
    //     })
    // });
}

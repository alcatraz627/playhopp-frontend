import React, { useState } from 'react'
// import _ from 'lodash'

// import { connect } from 'react-redux';
// import { updateCounter } from '../actions';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import routes from '../constants/routes';

import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';

import Collection from './Collection';
import Subscribe from './Subscribe';
import Reviews from './Reviews';
import FAQ from './FAQ';

import Contact from './Contact';

import Login from './Login';
import Signup from './Signup';



const routeList = [
    { route: routes.toys, Component: Collection },
    { route: routes.subscribe, Component: Subscribe },

    { route: routes.contact, Component: Contact },
    { route: routes.reviews, Component: Reviews },
    { route: routes.faq, Component: FAQ },

    { route: routes.signup, Component: Signup },
    { route: routes.login, Component: Login },

    { route: routes.homepage, Component: HomePage },
]

const App = (props) => {
    // let { counter, updateCounter } = props;

    // const decrement = () => {
    //     updateCounter(counter - 1)
    // }

    // const increment = () => {
    //     updateCounter(counter + 1)
    // }
    //     <button onClick={decrement}>-</button>
    //     {counter}
    // <button onClick={increment}>+</button>

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Switch>
                    {routeList.map(({ route, Component }) => <Route key={route} path={route} component={Component} />)}
                </Switch>
                <Footer />
            </Router>
        </MuiThemeProvider>
    )
}

// const mapStateToProps = state => ({
//     counter: state.counter
// });

// const mapDispatchToProps = dispatch => ({
//     updateCounter: counter => dispatch(updateCounter(counter))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App
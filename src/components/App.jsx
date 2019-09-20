import React, { useState } from 'react'
// import _ from 'lodash'

// import { connect } from 'react-redux';

// Using Router instead of BrowserRouter because of custom implementation
// of history instance for use with redux-saga
import { Router, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import routes from '../constants/routes';

import Navbar from './Structure/Navbar';
import Footer from './Static/Footer';
import Drawer from './Structure/Drawer';
import HomePage from './HomePage';

import Collection from './Collection';
import Subscribe from './Subscribe';
import PlaceOrder from './PlaceOrder';

import Reviews from './Static/Reviews';
import FAQ from './Static/FAQ';
import Contact from './Static/Contact';

import AuthComponent from './AuthComponent';
import NotifBar from './shared/NotifBar';


import { history } from '../store'

const routeList = [
    { route: routes.toys, Component: Collection },
    { route: routes.subscribe, Component: Subscribe },
    { route: routes.placeorder, Component: PlaceOrder },

    { route: routes.contact, Component: Contact },
    { route: routes.reviews, Component: Reviews },
    { route: routes.faq, Component: FAQ },

    { route: routes.signup, Component: AuthComponent },
    { route: routes.login, Component: AuthComponent },


    // Place all routes above this
    { route: routes.homepage, Component: HomePage },
]

const App = (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <Navbar />
                <Drawer />
                <Switch>
                    {routeList.map(({ route, Component }) => <Route key={route} path={route} component={Component} />)}
                </Switch>
                <Footer />
                <NotifBar />
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
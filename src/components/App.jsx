import React, { useState, lazy, Suspense } from 'react'
// import _ from 'lodash'

// import { connect } from 'react-redux';

// Using Router instead of BrowserRouter because of custom implementation
// of history instance for use with redux-saga
import { Router, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import LogOut from './LogOut';
import Profile from './Profile';
import NotifBar from './shared/NotifBar';


// const Navbar = React.lazy(() => import('./Structure/Navbar'))
// const Footer = React.lazy(() => import('./Static/Footer'))
// const Drawer = React.lazy(() => import('./Structure/Drawer'))
// const HomePage = React.lazy(() => import('./HomePage'))
// const Collection = React.lazy(() => import('./Collection'))
// const Subscribe = React.lazy(() => import('./Subscribe'))
// const PlaceOrder = React.lazy(() => import('./PlaceOrder'))
// const Reviews = React.lazy(() => import('./Static/Reviews'))
// const FAQ = React.lazy(() => import('./Static/FAQ'))
// const Contact = React.lazy(() => import('./Static/Contact'))
// const AuthComponent = React.lazy(() => import('./AuthComponent'))
// const Profile = React.lazy(() => import('./Profile'))
// const LogOut = React.lazy(() => import('./LogOut'))
// const NotifBar = React.lazy(() => import('./shared/NotifBar'))


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

    { route: routes.profile, Component: Profile },
    { route: routes.logout, Component: LogOut },


    // Place all routes above this
    { route: routes.homepage, Component: HomePage },
]

// const Loading = () => <div style={{ width: '100%', textAlign: 'center', paddingTop: '35%' }}><CircularProgress color="primary" /></div>

const App = (props) => {
    // return <Loading />
    return (
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                {/* <Suspense fallback={<Loading />}> */}

                <Navbar />
                <Drawer />
                <Switch>
                    {routeList.map(({ route, Component }) => <Route key={route} path={route} component={Component} />)}
                </Switch>
                <Footer />
                <NotifBar />
                {/* </Suspense> */}
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
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logoNavbar.png'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import routes from '../constants/routes';

const useStyles = makeStyles(theme => ({
    logo: {
        backgroundImage: `url(${logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'contain',
        minHeight: '180%',
        minWidth: '100px',
        padding: '25px 0',
        marginRight: '40px',
    },
    grow: {
        flexGrow: 1,
    },
    navLinkParent: {
        textDecoration: 'none',
        color: 'white',
        margin: '0 10px',
    },
    navlink: {
        transition: `0.25s all ease-in`,
        '&:hover': {
            transition: `0.1s all ease-out`,
            color: theme.palette.secondary.main,
        }
    }

}))

const navLinks = {
    left: [
        { route: routes.toys, title: 'Browse Collections' },
        { route: routes.plans, title: 'Subscription Plans' },
    ],
    right: [
        { route: routes.contact, title: 'Contact Us' },
        { route: routes.blog, title: 'Blog' },
        { route: routes.login, title: 'Log In' },
        { route: routes.signup, title: 'Sign Up' },
    ]
    // {route: '', title: ''},
}

const Navbar = props => {
    const classes = useStyles();

    const NavLink = ({ route, title }) =>
        <Link to={`${route}`} className={classes.navLinkParent}><Typography variant="subtitle1" className={classes.navlink}>{title}</Typography></Link>

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Link to={routes.homepage}><div className={classes.logo} /></Link>
                {/* <Typography variant="h6" className={classes.logo}>PlayHopp</Typography> */}

                {navLinks.left.map(e => <NavLink key={e.route} route={e.route} title={e.title} />)}
                <div className={classes.grow} />
                {navLinks.right.map(e => <NavLink key={e.route} route={e.route} title={e.title} />)}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
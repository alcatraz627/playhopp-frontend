import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logoNavbar.png'

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle, ShoppingBasket } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import routes from '../constants/routes';

const useStyles = makeStyles(theme => ({
    root: {
        // marginBottom: '20px',
    },
    logo: {
        backgroundImage: `url(${logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'contain',
        minHeight: '180%',
        minWidth: '100px',
        padding: '25px 0',
        margin: '0 30px',
    },
    grow: {
        flexGrow: 1,
    },
    navLinkParent: {
        textDecoration: 'none',
        margin: '0 10px',
    },
    navlink: {
        color: 'white',
        transition: `0.25s all ease-in`,
        '&:hover': {
            transition: `0.1s all ease-out`,
            color: theme.palette.secondary.main,
        }
    },
    menuLink: {
        textDecoration: 'none',
        color: 'initial',
    }

}))

const navLinks = {
    left: [
        { route: routes.toys, title: 'Browse Toys' },
        { route: routes.subscribe, title: 'Subscribe' },
        { route: routes.reviews, title: 'Reviews' },
    ],
    right: [
        { route: routes.faq, title: 'FAQ' },
        { route: routes.contact, title: 'Contact Us' },
        { route: routes.blog, title: 'Blog' },
    ],
    auth: {
        guest: [
            { route: routes.login, title: 'Log In' },
            { route: routes.signup, title: 'Sign Up' },
        ],
        user: [
            { route: routes.profile, title: 'My Profile' },
            { route: routes.logout, title: 'Log Out' },
        ]
    }
    // {route: '', title: ''},
}

const Navbar = props => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [elevation, setElevation] = useState(0)
    const handleMenuOpen = event => { setAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setAnchorEl(null) };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let scroll = window.pageYOffset || document.documentElement.scrollTop;
            setElevation(scroll < 20 ? 0 : 2)
        });
    }, [])


    const NavLink = ({ route, title }) =>
        <Link to={`${route}`} className={classes.navLinkParent}><Typography variant="subtitle1" className={classes.navlink}>{title}</Typography></Link>

    return (
        <AppBar position="sticky" className={classes.root} elevation={elevation}>
            <Toolbar>
                {/* <Typography variant="h6" className={classes.logo}>PlayHopp</Typography> */}

                <div className={classes.grow} />
                {navLinks.left.map(e => <NavLink key={e.title} route={e.route} title={e.title} />)}
                <Link to={routes.homepage}><div className={classes.logo} /></Link>
                {navLinks.right.map(e => <NavLink key={e.title} route={e.route} title={e.title} />)}
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <AccountCircle />
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    {navLinks.auth.guest.map(e => <MenuItem key={e.route}><Link className={classes.menuLink} to={e.route}>{e.title}</Link></MenuItem>)}
                </Menu>
                <IconButton color="inherit">
                    <ShoppingBasket />
                </IconButton>
                <div className={classes.grow} />
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
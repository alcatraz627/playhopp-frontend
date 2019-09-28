import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { toggleDrawer } from '../../actions'

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge, Avatar, } from '@material-ui/core'
import { AccountCircle, ShoppingBasket } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import logo from '../../../assets/logoNavbar.png'
import routes from '../../constants/routes';

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

    const { cartLength, user } = props
    const { toggleDrawer } = props

    const [anchorEl, setAnchorEl] = useState(null)
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
                    {user.profile_pic ? <Avatar imgProps={{width: 10}} src={user.profile_pic} /> : <AccountCircle />}
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose} onClick={handleMenuClose}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    {navLinks.auth[user.token ? 'user' : 'guest'].map(e => <Link className={classes.menuLink} to={e.route} key={e.route}><MenuItem>{e.title}</MenuItem></Link>)}
                </Menu>
                <IconButton color="inherit" onClick={() => { toggleDrawer(true) }}>
                    <Badge invisible={cartLength == 0} color="secondary" badgeContent={cartLength}>
                        <ShoppingBasket />
                    </Badge>
                </IconButton>
                <div className={classes.grow} />
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state, ownProps) => ({
    // isDrawerOpen: state.general.isCartOpen,
    cartLength: Object.keys(state.cart).length,
    user: state.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleDrawer: (open) => dispatch(toggleDrawer({ open }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
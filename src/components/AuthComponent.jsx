import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { Container, Grid, Button, Typography, Tabs, Tab, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red, grey } from '@material-ui/core/colors'

import { apiCall } from '../actions'
import { apiRoutes, API_DATA_TYPE, API_STATES, API_METHODS } from '../constants/api'

import { Link, Redirect } from 'react-router-dom'
import routes from '../constants/routes'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '60px auto'
    },
    paper: {
        marginTop: '30px',
        padding: '30px 60px',
        border: `1px solid ${grey[400]}`
    },
    textField: {
        margin: '10px 0',
    },
    title: {
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    forgotlink: {
        // textDecoration: 'none',
        color: grey[700]
    }
}))

const KEYS = {
    LOGIN: {
        USERNAME: 'username',
        PASSWORD: 'password',
    },
    REGISTER: {
        USERNAME: 'username',
        CONTACT_NUMBER: 'contact_number',
        PASSWORD: 'password',
        CONFIRM_PASSWORD: 'confirm_password',
    },
}

const KEY_DETAILS = {
    [KEYS.REGISTER.USERNAME]: {
        title: 'Enter Email ID',
        type: 'email',
        validator: value => /^.+@[^\.].*\.[a-z]{2,}$/.test(value),
        errMsg: 'Please enter a valid email',
    },
    [KEYS.REGISTER.CONTACT_NUMBER]: {
        title: 'Enter Phone Number',
        type: 'text',
        validator: value => value.length == 10,
        errMsg: 'Please enter a valid 10 digit phone number',
    },
    [KEYS.REGISTER.PASSWORD]: {
        title: 'Enter Password',
        type: 'password',
        validator: value => value.length > 5,
        errMsg: 'Please enter a password of at least 6 characters',
    },
    [KEYS.REGISTER.CONFIRM_PASSWORD]: {
        title: 'Re-Enter Password',
        type: 'password',
        validator: (value, details) => ((value.length > 5) && (value == details[KEYS.LOGIN.PASSWORD])),
        errMsg: 'Password does not match or is too short',
    },
}

const AuthComponent = props => {
    const classes = useStyles()

    let { user } = props
    let { attemptLogin, attemptSignup } = props

    const [isRegister, setRegister] = useState(props.location.pathname == routes.signup)

    let keysForForm = isRegister ? KEYS.REGISTER : KEYS.LOGIN
    const [details, setDetails] = useState(Object.assign({}, ...Object.values(keysForForm).map(e => ({ [e]: '' }))))
    const [invalid, setInvalid] = useState(Object.assign({}, ...Object.values(keysForForm).map(e => ({ [e]: false }))))

    useEffect(() => {
        setRegister(props.location.pathname == routes.signup)
    }, [props.location.pathname])

    // TODO: Run valdiation after nonempty input changes
    const handleTextChange = ({ target: { name, value } }) => {
        setInvalid(Object.assign({}, ...Object.values(keysForForm).map(e => ({ [e]: false }))))
        setDetails({ ...details, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setInvalid(Object.assign({}, ...Object.values(keysForForm).map(e => ({ [e]: !KEY_DETAILS[e].validator(details[e], details) }))));
        // TODO: Make sure submit happens AFTER validation
        !Object.values(invalid).reduce((acc, curr) => acc || curr, false) && (isRegister ? attemptSignup : attemptLogin)(details)
    }

    return (
        (user.token) ? <Redirect to={{ pathname: routes.homepage }} /> :
            <Container maxWidth="sm" className={classes.root}>

                <Paper elevation={0} className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h3" className={classes.title}>{isRegister ? "Sign Up" : "Log In"}</Typography>
                        <br />
                        {Object.keys(details).map(e => (
                            <TextField className={classes.textField} fullWidth error={invalid[e]} type={KEY_DETAILS[e].type} value={details[e]} name={e}
                                helperText={invalid[e] ? KEY_DETAILS[e].errMsg : null} label={KEY_DETAILS[e].title} key={e} onChange={handleTextChange} />
                        ))}
                        <br />
                        <br />
                        <br />
                        <Button type="submit" fullWidth color="primary" variant="contained">{isRegister ? "Create Account" : "Log In"}</Button>
                        <br />
                        <br />
                        <Typography variant="body2">{isRegister
                            ? <>Already a member? <Link to={routes.login} className={classes.link}>Log in</Link></>
                            : <>Not a member? <Link to={routes.signup} className={classes.link}>Create an account</Link></>}</Typography>
                        <Typography variant="body2" style={{}}>
                            <Link to={routes.forgotpass} className={classes.forgotlink}>Forgot Password?</Link>
                        </Typography>
                    </form>
                </Paper>
            </Container>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // fetchToys: () => dispatch(apiCall({ route: apiRoutes.TOYS(), dataType: API_DATA_TYPE.TOYS, method: API_METHODS.POST })),
    attemptLogin: (data) => dispatch(apiCall({ route: apiRoutes.LOGIN(), dataType: API_DATA_TYPE.LOGIN, method: API_METHODS.POST, data })),
    attemptSignup: (data) => dispatch(apiCall({ route: apiRoutes.SIGNUP(), dataType: API_DATA_TYPE.SIGNUP, method: API_METHODS.POST, data })),

})

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent)
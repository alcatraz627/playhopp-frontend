import React from 'react'

import { Button, Typography, Paper, Container, TextField, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, Route, Link } from 'react-router-dom'
import routes from '../../constants/routes'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '60px auto'
    },
    paper: {
        marginTop: '30px',
        padding: '30px 60px',
        border: `1px solid ${theme.palette.grey[400]}`
    },
    textField: {
        margin: '10px 0',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },

}))

// Main component
const ForgotPass = props => {
    const classes = useStyles()
    return (
        <Container className={classes.root} maxWidth="sm">
            <Paper elevation={0} className={classes.paper}>
                {/* <Link to={routes.forgotpass}>Root</Link> | 
                <Link to={routes.forgotpass + '/a'}>slash-a</Link> */}
                {/* {Object.values(FP_ROUTES).map(({ route, Component }) =>
                    <Route key={'key-' + route} path={`${routes.forgotpass}/${route}`} component={Component} />
                )} */}
                <Route path={`${routes.forgotpass}/found`} component={Found} />
                <Route path={`${routes.forgotpass}/newpass`} component={NewPass} />
                <Route path={`${routes.forgotpass}/success`} component={Success} />
                <Route exact path={`${routes.forgotpass}`} component={FindAcc} />
            </Paper>
        </Container>
    )
}

const FindAcc = props => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h5">Find Your Account</Typography>
            <TextField className={classes.textField} fullWidth name="Email" type="email"
                helperText="Please enter your email address to search for your account." label="Email Address"
            // onChange={} error={invalid[e]} value={}
            />
            <br />
            <br />
            <Link to={routes.forgotpass + "/found"} className={classes.link}>
                <Button variant="contained" color="primary">Search</Button>
            </Link>
        </>
    )
}

const Found = props => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h5">Verify Account</Typography>
            <Typography variant="body2">An email has been sent to your account. Please Enter the code from the email in the box below.</Typography>
            <TextField className={classes.textField} fullWidth name="Code" type="text" label="Enter Code"
            // onChange={} error={invalid[e]} value={}
            />
            <br />
            <br />
            <Link to={routes.forgotpass + "/newpass"} className={classes.link}>
                <Button variant="contained" color="primary">Verify</Button>&nbsp;&nbsp;&nbsp;
            </Link>
            <Link to={routes.forgotpass} className={classes.link}>
                <Button variant="outlined" >Re-Enter Email</Button>
            </Link>
        </>
    )
}

const NewPass = props => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h5">Password Recovery</Typography>
            <Typography variant="body2">Set a new password.</Typography>
            <TextField className={classes.textField} fullWidth name="password" type="password" label="Enter New Password"
            // onChange={} error={invalid[e]} value={}
            />
            <TextField className={classes.textField} fullWidth name="confirm_password" type="password" label="Re-Enter New Password"
            // onChange={} error={invalid[e]} value={}
            />
            <br />
            <br />
            <Link to={routes.forgotpass + "/success"} className={classes.link}>
                <Button variant="contained" color="primary">Update</Button>
            </Link>
        </>
    )
}
const Success = props => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h5">Password Updated Successfully!</Typography>
            <Typography variant="body2">You have updated your password. Please log in with your new password.</Typography>
            <br />
            <Divider />
            <br />
            <Link to={routes.login} className={classes.link}>
                <Button variant="contained" color="primary">Log In</Button>
            </Link>
        </>
    )
}

export default ForgotPass
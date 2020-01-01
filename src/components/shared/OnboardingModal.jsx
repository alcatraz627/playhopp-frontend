import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import routes from '../../constants/routes';

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import { Grid, Typography, Button, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getCardImage } from '../../constants/api'

// import Slider from 'react-slick'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '900px',
        minWidth: '600px',
    },
    // closeButton: {
    //     boxShadow: 'none',
    //     backgroundColor: 'white',
    //     fontSize: theme.typography.h6.fontSize,
    //     float: 'right'
    // },
    title: {
        marginTop: 5,
    },
    img: {
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
    },
    signup: {
        minWidth: '400px',
        margin: '10px 0',
    },
}))

const OnboardingModal = props => {

    const classes = useStyles()

    let { onClose, toy, open } = props

    return toy ? (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
            <DialogTitle disableTypography align="center">
                <Typography color="primary" variant="h5" className={classes.title}>Great Choice! Your child will love this!</Typography>
                <Typography variant="body1">Now, Let's deliver this and many other toys to you</Typography>
                {/* <Fab variant="round" color="default" size="small" className={classes.closeButton} onClick={onClose}>&times;</Fab> */}
            </DialogTitle>

            <DialogContent align="center">
                {/* <Typography variant="body1">{JSON.stringify(toy)}</Typography> */}
                <img src={getCardImage(toy.id)} width="100%" className={classes.img} />
                <br />
                <Typography variant="h6">{toy.title}</Typography>
                <br />
                <Link to={routes.signup} style={{textDecoration: 'none'}}>
                    <Button variant="contained" color="primary" className={classes.signup}>Sign Up</Button>
                </Link>
                <br />
                <Button variant="text" size="small" onClick={onClose}>Change toy selection</Button>
                <br /><br />
                <Divider />
                <br />
                <Typography variant="h6" color="textSecondary" style={{fontStyle: 'italic'}}>Because, the future belongs to the curious</Typography>
                <br />
            </DialogContent>
            {/* <DialogActions>
            </DialogActions> */}
        </Dialog>
    ) : "Loading..."
}

const mapStateToProps = (state, ownProps) => ({
    toy: Object.values(state.cart).length && state.toys[Object.values(state.cart)[0]]
})

export default connect(mapStateToProps)(OnboardingModal)
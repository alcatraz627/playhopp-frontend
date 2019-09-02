import React from 'react'

import { Grid, Typography, List, ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import logo from '../../../assets/logo.png'

const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: theme.palette.grey[200]
        borderWidth: '2px 0 0 0',
        borderColor: `'${theme.palette.secondary.main}'`,
        borderStyle: 'solid',
        maxWidth: `${theme.breakpoints.values.lg - 200}px`,
        padding: '40px 100px',
        margin: '20px auto 0',
    },
    white: {
        color: 'white'
    },
    link: {
        textDecoration: 'none',
        color: 'initial',
    },
    logo: {
        maxWidth: '50%',
        margin: 'auto'
    },
    logoContainer: {
        textAlign: 'center'
    },
}))

const Footer = props => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item md={2}>
                    <List>
                        {["Collection", "FAQ", "Reviews", "Terms of Use"].map(e =>
                            <ListItem key={e}>
                                <Link className={classes.link} to="/"><Typography variant="body2">{e}</Typography></Link>
                            </ListItem>)}
                    </List>
                </Grid>
                <Grid item md={2}>
                    <List>
                        {["Contact Us", "Blog", "Careers", "Our Mission"].map(e =>
                            <ListItem key={e}>
                                <Link className={classes.link} to="/"><Typography variant="body2">{e}</Typography></Link>
                            </ListItem>)}
                    </List>
                </Grid>
                <Grid item md={4} className={classes.logoContainer}>
                    <img src={logo} className={classes.logo} />
                </Grid>
                <Grid item md={4}>
                        <List>
                            <ListItem>
                                <Typography variant="body2">
                                    Third Floor, Sun Towers Plot No 1097,<br />Rd Number 36, beside Peddamma Temple Kamaan, CBI Colony, Jubilee Hills, <br />Hyderabad, Telangana 500033
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body2">
                                    070436 69214
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body2">
                                    hello@playhopp.com
                                </Typography>
                            </ListItem>
                        </List>
                </Grid>
                </Grid>
        </div>
            )
        }

export default Footer
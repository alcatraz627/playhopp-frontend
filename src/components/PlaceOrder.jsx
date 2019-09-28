import React, { useState } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import routes from '../constants/routes'
import { getCardImage } from '../constants/api'

import { Container, Paper, Typography, Divider, Grid, Button, Avatar, IconButton, Icon, TextField, Badge } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'
import { Card, CardHeader, CardContent, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

import ToyModal from './shared/ToyModal'

const useStyles = makeStyles(theme => ({
    root: {
    },
    gridBG: {
        background: grey[50],
        padding: '40px',
    },
    heading: {
        margin: '20px 0',
    },
    card: {
        border: `1px solid ${grey[300]}`,
    },
    dFlex: {
        display: 'flex'
    },
}))

const PlaceOrder = props => {
    const classes = useStyles()

    const [modalItem, setModalItem] = useState(null)

    const handleModalOpen = id => event => {
        setModalItem(id)
    }

    const handleModalClose = event => {
        setModalItem(null)
    }

    const { cart, user, toys, brands, categories } = props
    const { removeFromCart, placeOrder } = props

    // TODO: Fix redirecting away
    // return (!user.token) ? <Redirect to={{ pathname: routes.login }} /> :
    return (
        <Container className={classes.root}>
            <br />
            <Typography variant="h4" className={classes.heading}>Finalize HoppList</Typography>
            <br />
            <Grid container spacing={3} className={classes.gridBG}>
                <Grid item md={8} sm={12}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Card className={classes.card} elevation={0}>
                                <CardHeader subheader="Login" subheaderTypographyProps={{ color: "textPrimary", variant: "h5" }} />
                                <CardContent>
                                    <Typography variant="h6">{user.first_name}</Typography>
                                    <div className={classes.dFlex}>
                                        <Icon fontSize="small" color="primary">email</Icon>&nbsp;&nbsp;<Typography variant="subtitle2">{user.username}</Typography>
                                    </div>
                                    <div className={classes.dFlex}>
                                        <Icon fontSize="small" color="primary">phone</Icon>&nbsp;&nbsp;<Typography variant="body2">{user.contact_number}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12}>
                            <Card className={classes.card} elevation={0}>
                                <CardHeader subheader="Hopplist" subheaderTypographyProps={{ color: "textPrimary", variant: "h5" }} />
                                <CardContent>
                                    <List>
                                        {Object.values(cart.map(e => toys[e]))
                                            .map((e, i) => (
                                                <ListItem button onClick={handleModalOpen(e.id)} dense alignItems="flex-start" key={e.id}>
                                                    {/* <ListItemAvatar><Badge color="secondary" showZero badgeContent={i + 1} ></Badge></ListItemAvatar> */}
                                                    <ListItemAvatar><Avatar src={getCardImage(e.id)} /></ListItemAvatar>
                                                    <ListItemText primary={<Typography variant="body1">{e.title}</Typography>} secondary={`Hopp Points: ${e.points}`} />
                                                    {/* <ListItemSecondaryAction>
                                                        <IconButton onClick={() => { removeFromCart(e.id) }}><Icon color="error" variant="outlined">cancel</Icon></IconButton>
                                                    </ListItemSecondaryAction> */}
                                                </ListItem>
                                            ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <Button variant="contained" fullWidth color="primary" disabled={cart.length != 10} onClick={placeOrder}>Pay</Button>
                            {(cart.length < 10) && <Typography variant="subtitle2" color="error">Please select {10 - cart.length} more item{cart.length == 9 ? '' : 's'}</Typography>}
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item md={4} sm={12}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Card className={classes.card} elevation={0}>
                                <CardHeader subheader="Delivery Address" subheaderTypographyProps={{ color: "textPrimary", variant: "h5" }} />
                                <CardContent>
                                    {/* <TextField disabled multiline fullWidth value={address} /> */}
                                    <Typography variant="body2" component="pre">{user.address}</Typography>
                                    <br />
                                    <Button variant="outlined" color="primary">Edit Address</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12}>
                            <Card className={classes.card} elevation={0}>
                                <CardHeader subheader="Subscription Details" subheaderTypographyProps={{ color: "textPrimary", variant: "h5" }} />
                                <CardContent>
                                    <Typography variant="body2">
                                        Subscription Duration: <b>One Month</b> <Button color="primary">Change</Button> <br /><br />
                                    </Typography>
                                    <Divider /><br />
                                    <Typography variant="body2">
                                        Base charge <b>₹800/month</b> <br />
                                        GST <b>10%</b> <br /><br />
                                    </Typography>
                                    <Divider /><br />
                                    <Typography variant="body2">
                                        <b>Total Payable: ₹ 880/month</b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {modalItem && <ToyModal toyId={modalItem} onClose={handleModalClose} />}
        </Container>
    )
}

const mapStateToProps = state => ({
    cart: Object.values(state.cart),
    user: state.user,
    toys: state.toys,
    brands: state.brands,
    categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
    placeOrder: () => dispatch(),
    removeFromCart: item => dispatch(cartRemove({ item })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)

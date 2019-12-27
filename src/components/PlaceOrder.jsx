import React, { useState } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import routes from '../constants/routes'
import { getCardImage, apiRoutes, API_DATA_TYPE, API_METHODS } from '../constants/api'

import { Container, Paper, Typography, Divider, Grid, Button, Avatar, IconButton, Icon, TextField, Badge, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemAvatar, } from '@material-ui/core'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

import ToyModal from './shared/ToyModal'
import { API_CALL } from '../actions/actionTypes'
import { apiCall } from '../actions'

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

const PLAN_CHOICES_KEYS = {
    ONE: 'ONE',
    THREE: 'THREE',
    SIX: 'SIX',
}

const PLAN_CHOICES = {
    [PLAN_CHOICES_KEYS.ONE]: {
        duration: 1,
        durationLabel: '1 month',
        price: 800,
    },
    [PLAN_CHOICES_KEYS.THREE]: {
        duration: 3,
        durationLabel: '3 months',
        price: 700,
    },
    [PLAN_CHOICES_KEYS.SIX]: {
        duration: 6,
        durationLabel: '6 months',
        price: 600,
    },
}

const PlaceOrder = props => {
    const classes = useStyles()

    const { cart, user, toys, brands, categories } = props
    const { removeFromCart, placeOrder } = props

    const [modalItem, setModalItem] = useState(null)
    const [address, setAddress] = useState(user.address || "")
    const [isAddressEditing, setAddressEditing] = useState(false)

    const [duration, setDuration] = useState(PLAN_CHOICES_KEYS.THREE)

    const handleModalOpen = id => event => {
        setModalItem(id)
    }

    const handleModalClose = event => {
        setModalItem(null)
    }

    const handleAddressChange = ({ target: { name, value } }) => { setAddress(value) }

    const handleDurationChange = ({ target: { name, value } }) => { setDuration(value) }

    const handlePlaceOrder = e => {
        placeOrder({
            email: user.username,
            contact_number: user.contact_number,
            address,
            plan: duration
        })
    }

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
                            <Button variant="contained" fullWidth color="primary" disabled={cart.length != 10} onClick={handlePlaceOrder}>Pay</Button>
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
                                    {isAddressEditing
                                        ? <><TextField multiline value={address} onChange={handleAddressChange} rows={3} fullWidth /><br /></>
                                        : <Typography variant="body2" component="pre">{address}</Typography>}
                                    <br />
                                    <Button variant="text" color="primary" onClick={() => setAddressEditing(!isAddressEditing)}>{isAddressEditing ? "Save Address" : "Edit Address"}</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12}>
                            <Card className={classes.card} elevation={0}>
                                <CardHeader subheader="Subscription Details" subheaderTypographyProps={{ color: "textPrimary", variant: "h5" }} />
                                <CardContent>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="duration">Subscription Duration</InputLabel>
                                        <Select value={duration} onChange={handleDurationChange} fullWidth inputProps={{ name: 'duration', id: 'duration' }} renderValue={() => PLAN_CHOICES[duration].durationLabel}>
                                            {Object.keys(PLAN_CHOICES_KEYS).map(p => <MenuItem key={p} value={p}>{`${PLAN_CHOICES[p].durationLabel} | ₹ ${PLAN_CHOICES[p].price}/month`}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Divider /><br />
                                    <Typography variant="subtitle1" component="div">
                                        Base charge: <b>₹ {PLAN_CHOICES[duration].price}/month</b>
                                    </Typography>
                                    <Typography variant="caption" component="div">
                                        GST: <b>10%</b>
                                    </Typography>
                                    <br /><Divider /><br />
                                    <Typography variant="h6">
                                        Total Payable: ₹ {parseInt(PLAN_CHOICES[duration].price * PLAN_CHOICES[duration].duration * 1.1)}
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
    placeOrder: (data) => dispatch(apiCall({ route: apiRoutes.SUBSCRIPTION(), dataType: API_DATA_TYPE.SUBSCRIPTION, data, auth: true, method: API_METHODS.POST })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)

import React, { useState, useEffect } from 'react'

import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { toggleDrawer, cartRemove } from '../../actions'

import { SwipeableDrawer, Typography, Divider, Grid, Button, Avatar, IconButton, Icon } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import ToyModal from '../shared/ToyModal'
import routes from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '30px 20px',
        width: '500px',
    },
    dividerTop: {
        margin: '30px 0px 20px',
        backgroundColor: '#aaa',
    },
    dividerBottom: {
        margin: '20px 0px 30px',
        backgroundColor: '#aaa',
    },
    list: {
        maxHeight: '70vh',
        overflowY: 'scroll'
    },
}))

const Drawer = props => {
    const classes = useStyles()

    const [modalItem, setModalItem] = useState(null)

    const handleModalOpen = id => event => {
        setModalItem(id)
    }

    const handleModalClose = event => {
        setModalItem(null)
    }


    return (
        <SwipeableDrawer anchor="right" open={props.isDrawerOpen}
            onOpen={() => { props.toggleDrawer(true) }} onClose={() => { props.toggleDrawer(false) }}>
            <div className={classes.root}>

                <Typography variant="h4">My Hopplist</Typography>
                <Typography variant="subtitle1" color="primary">{props.cart.length}/10 items</Typography>
                <Divider className={classes.dividerTop} />
                <List className={classes.list}>
                    {Object.values(props.cart.map(e => props.toys[e]))
                        .map(e => (
                            <ListItem button onClick={handleModalOpen(e.id)} dense alignItems="flex-start" key={e.id}>
                                <ListItemAvatar><Avatar src={e.primaryImage} /></ListItemAvatar>
                                <ListItemText primary={<Typography variant="body1">{e.title}</Typography>} secondary={`Hopp Points: `} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => { props.removeFromCart(e.id) }}><Icon color="error" variant="outlined">cancel</Icon></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                </List>
                <Divider className={classes.dividerBottom} />
                {/* <Button variant="contained" color="primary" disabled={props.cart.length < 10}>Proceed to Payment</Button> */}
                <Link to={routes.placeorder} style={{textDecoration: 'none'}}><Button variant="contained" color="primary" onClick={() => props.toggleDrawer(false)} disabled={props.cart.length < 10}>Proceed to Payment</Button></Link>
                {(props.cart.length < 10) && <Typography variant="subtitle2" color="error">Please select {10 - props.cart.length} more items</Typography>}
            </div>
            {modalItem && <ToyModal toyId={modalItem} onClose={handleModalClose} />}

        </SwipeableDrawer>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isDrawerOpen: state.general.isCartOpen,
    cart: Object.values(state.cart),
    toys: state.toys,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleDrawer: (open) => dispatch(toggleDrawer({ open })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
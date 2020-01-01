import React from 'react'
import { connect } from 'react-redux'

import { Button, Chip, Avatar, Icon } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

import { cartAdd, cartRemove } from '../../actions'

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
        // width: '20px',
        // height: '20px',
        transform: 'scale(0.8)'
    },
    removeButton: {
        // backgroundColor: red[700], 
        // color: 'white', 
        color: red[500],
        borderColor: red[500],
        '&:hover': {
            borderColor: red[700],
        }
    },
}))

const CartAddButton = props => {
    const classes = useStyles()

    const { isInCart, cartLength, toyId, onlyButton = false, isLoggedIn } = props
    const { addToCart, removeFromCart } = props

    return isInCart ?
        <>
            {!onlyButton && <Chip variant="outlined" color="primary" label="Added to cart" avatar={<Avatar><Icon>shopping_cart</Icon></Avatar>} />}
            {onlyButton && <Avatar className={classes.avatar}><Icon color="inherit" fontSize="small">shopping_cart</Icon></Avatar>}
            <Button variant="outlined" color="secondary" onClick={() => { removeFromCart(toyId) }} className={classes.removeButton}>
                <Icon>remove_shopping</Icon>&nbsp;Remove</Button>
        </>
        :
        <Button color="primary" disabled={cartLength >= (isLoggedIn ? 10 : 1)} onClick={() => { addToCart(toyId) }}><Icon>library_add</Icon>&nbsp;{isLoggedIn ? "Add to Hopplist" : "Get it now"}</Button>
}

const mapStateToProps = (state, ownProps) => ({
    isInCart: !!(ownProps.toyId && state.cart[ownProps.toyId]),
    cartLength: Object.keys(state.cart).length,
    isLoggedIn: !!state.user.token
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addToCart: item => dispatch(cartAdd({ item })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})


export default connect(mapStateToProps, mapDispatchToProps)(CartAddButton)
import React from 'react'
import { connect } from 'react-redux'

import { Button, Chip, Avatar, Icon } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

import { cartAdd, cartRemove } from '../../actions'

const CartAddButton = props => {
    const { isInCart, toyId, onlyButton = false } = props
    const { addToCart, removeFromCart } = props

    return isInCart ?
        <>
            {!onlyButton && <Chip variant="outlined" color="primary" label="Added to cart" avatar={<Avatar><Icon>shopping_cart</Icon></Avatar>} />}
            <Button variant="outlined" color="secondary" onClick={() => { removeFromCart(toyId) }}
                // style={{ color: red[500], borderColor: red[500] }}
            >
                <Icon>remove_shopping</Icon>&nbsp;Remove from Hopplist</Button>
        </>
        :
        <Button color="primary" onClick={() => { addToCart(toyId) }}><Icon>library_add</Icon>&nbsp;Add to Hopplist</Button>
}

const mapStateToProps = (state, ownProps) => ({
    isInCart: !!(ownProps.toyId && state.cart[ownProps.toyId]),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addToCart: item => dispatch(cartAdd({ item })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})


export default connect(mapStateToProps, mapDispatchToProps)(CartAddButton)
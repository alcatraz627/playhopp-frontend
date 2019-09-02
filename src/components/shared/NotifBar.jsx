import React, { useState } from 'react'

import { connect } from 'react-redux'

import { setNotif } from '../../actions'

import { CloseIcon } from '@material-ui/icons';
import { Snackbar, IconButton } from '@material-ui/core';

const NotifBar = props => {
    const { message, dismiss } = props

    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={!!message} message={message} onClose={dismiss} autoHideDuration={5000} />
    )
}

const mapStateToProps = state => ({
    message: state.general.message
})

const mapDispatchToProps = dispatch => ({
    dismiss: () => dispatch(setNotif({ message: null }))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotifBar)
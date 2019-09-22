import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import { logout } from '../actions'

const Signup = ({attemptLogout}) => {
    useEffect(() => {
        attemptLogout()
    }, [])
    return (<div>Signing Out...</div>)
}

const mapDispatchToProps = (dispatch) => ({
    attemptLogout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(Signup)
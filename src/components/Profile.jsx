import React, { useState } from 'react'
import { connect } from 'react-redux'

import cx from 'classnames'
import { apiUrl } from '../constants/api'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Container, Button, Typography, TextField, Paper, Divider, Icon, IconButton } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'

import LogOut from './LogOut'

const useStyles = (profile_pic) => makeStyles(theme => ({
    root: {
        margin: '40px 20px',
    },
    paperSpacing: {
        padding: '20px 16px',
        position: 'relative'
    },
    center: {
        textAlign: 'center',
    },
    profilePic: {
        backgroundColor: '#6661',
        backgroundImage: `url('${profile_pic}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        border: '1px solid lightgrey',
        paddingBottom: '80%',
        width: '80%',
        borderRadius: '100%',
        margin: '0 auto 20px',
    },
    selectedListItem: {
        color: theme.palette.primary.main,
    },
    editButton: {
        position: 'absolute',
        top: '6px',
        right: '6px',
    }
}))

const NAV_LIST_ITEMS = {
    orderHistory: 'orderHistory',
    currentHopplist: 'currentHopplist',
    subscriptionStatus: 'subscriptionStatus',
    editProfile: 'editProfile',
    logout: 'logout',
}

const DummyComp = p => <div>Dummy Component</div>


const navListItemDetails = {
    account: {
        [NAV_LIST_ITEMS.orderHistory]: {
            id: [NAV_LIST_ITEMS.orderHistory],
            title: 'Order History',
            icon: 'history',
            Component: DummyComp,
        },
        [NAV_LIST_ITEMS.currentHopplist]: {
            id: [NAV_LIST_ITEMS.currentHopplist],
            title: 'Current Hopplist',
            icon: 'list',
            Component: DummyComp,
        },
        [NAV_LIST_ITEMS.subscriptionStatus]: {
            id: [NAV_LIST_ITEMS.subscriptionStatus],
            title: 'Subscription Status',
            icon: 'attach_money',
            Component: DummyComp,
        },
    },
    profile: {
        [NAV_LIST_ITEMS.editProfile]: {
            id: [NAV_LIST_ITEMS.editProfile],
            title: "Edit Profile",
            icon: 'edit',
            Component: DummyComp,
        },
        [NAV_LIST_ITEMS.logout]: {
            id: [[NAV_LIST_ITEMS.logout]],
            title: "Log Out",
            icon: 'power_settings_new',
            Component: LogOut,
        },
    },
}


const Profile = props => {
    const { user } = props
    const classes = useStyles(user.profile_pic || '')()

    const [selectedItem, setSelectedItem] = useState(NAV_LIST_ITEMS.editProfile)

    const navList = items => Object.values(items).map(item => <ListItem button key={item.id} selected={item.id == selectedItem} onClick={() => setSelectedItem(item.id)}>
        <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
        <ListItemText primary={item.title} primaryTypographyProps={{ className: cx({ [classes.selectedListItem]: item.id == selectedItem }) }} />
    </ListItem>)

    let itemToRender = { ...navListItemDetails.profile, ...navListItemDetails.account }[selectedItem]

    return <div>
        <Container className={classes.root}>
            <Grid container spacing={4}>
                <Grid item md={3} sm={12}>
                    <Paper className={cx(classes.paperSpacing, classes.center)}>
                        {selectedItem != NAV_LIST_ITEMS.editProfile && <IconButton onClick={() => setSelectedItem(NAV_LIST_ITEMS.editProfile)} className={classes.editButton}><Icon>{navListItemDetails.profile[NAV_LIST_ITEMS.editProfile].icon}</Icon></IconButton>}
                        <div className={classes.profilePic}></div>
                        <Typography variant="h5">{user.first_name}</Typography>
                        <Typography variant="body2" color="textSecondary">{user.username}</Typography>
                    </Paper>
                    <br />
                    <Paper>
                        <List component="nav">
                            {navList(navListItemDetails.account)}
                            <Divider variant="middle" />
                            {navList(navListItemDetails.profile)}
                        </List>
                    </Paper>
                </Grid>
                <Grid item md={9} sm={12}>
                    <Paper className={classes.paperSpacing}>
                        <Typography variant="h5">{itemToRender.title}</Typography>
                        <itemToRender.Component />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </div>
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
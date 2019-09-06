import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { apiCall, cartAdd, cartRemove } from '../actions'
import { apiRoutes, API_DATA_TYPE, API_STATES, API_METHODS } from '../constants/api'

import { Button, Chip, TextField, InputAdornment, Paper, Select, FormControl, InputLabel, Input, MenuItem } from '@material-ui/core'
import { Grid, Container, Divider, Avatar, Typography, Icon } from '@material-ui/core'
import { Card, CardContent, CardHeader, CardMedia, CardActions } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { red, grey } from '@material-ui/core/colors'

import CartAddButton from './shared/CartAddButton'
import ToyModal from './shared/ToyModal'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
        paddingTop: '40px',
    },
    searchResults: {
        marginTop: '30px',
        marginBottom: '30px',
        backgroundColor: grey[200],
    },
    grow: {
        // flexGrow: 1,
        // height: '100%'
    },
    cardContainer: {
        padding: '20px',
    },
    card: {
        maxWidth: 400,
        minWidth: 300,
        height: '100%',
        // margin: '10px auto',
        margin: 'auto'
    },
    cardHeader: {
        height: '60px',
        alignItems: 'flex-start',
    },
    cardBody: {
        // height: '100px',
        // alignItems: 'flex-start',
        // padding: '0 0 20px',
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        filter: 'grayscale(0.3)',
    },
    cardAction: {
    },
    cardLikes: {
        display: 'flex',
        color: red[500],
        padding: '10px 0',
    },
    queryBar: {
        padding: '20px',
        border: `1px solid ${grey[200]}`,
    },
    filterChips: {
        display: 'flex',
        flexWrap: 'wrap',
    }
}))


const Collection = props => {
    const classes = useStyles()

    useEffect(() => {
        (props.apiStatus[API_DATA_TYPE.BRANDS] == API_STATES.FETCHED) &&
            (props.apiStatus[API_DATA_TYPE.CATEGORIES] == API_STATES.FETCHED) &&
            (props.apiStatus[API_DATA_TYPE.TOYS] == API_STATES.NOT_FETCHED) && props.fetchToys()
    }, [props.apiStatus])

    const [hoverCard, setHoverCard] = useState(null)
    const [modalItem, setModalItem] = useState(null)
    const [categoryFilters, setCategoryFilters] = useState([])

    const handleMouseOver = (e) => (event) => {
        setHoverCard(e.id)
    }

    const handleMouseOut = (event) => {
        setHoverCard(null)
    }

    const handleModalOpen = id => event => {
        setModalItem(id)
    }

    const handleModalClose = event => {
        setModalItem(null)
    }

    // - search
    // - sort
    // - filter
    return (
        <Container className={classes.root}>
            <Typography variant="h4">Browse Toys</Typography>

            <Grid container spacing={0} className={classes.searchResults}>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.queryBar}>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <TextField fullWidth label="Search" variant="standard" color="primary" placeholder="Search" InputProps={{ startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment> }} />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Filter By Category</InputLabel>

                                    <Select fullWidth multiple value={categoryFilters} input={<Input id="select-category"
                                        startAdornment={<InputAdornment position="start"><Icon>sort</Icon></InputAdornment>} />}
                                        renderValue={selected => <div className={classes.filterChips}>{categoryFilters.map(e => <Chip key={e} label={e} />)}</div>}
                                    >

                                        {Object.values(props.categories).map(e => e.title).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Filter By Category</InputLabel>
                                    <Select fullWidth multiple value={categoryFilters}
                                        input={<Input id="select-category" startAdornment={<InputAdornment position="start"><Icon>filter_list</Icon></InputAdornment>} />}>
                                        {Object.values(props.categories).map(e => e.title).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>

                {Object.values(props.toys).map(e => (
                    <Grid key={e.id} item xs={12} sm={12} md={4} lg={3} className={classes.cardContainer}>
                        <Card className={classes.card} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver(e)} elevation={hoverCard == e.id ? 2 : 0}>
                            <CardMedia className={classes.cardMedia} image={e.primaryImage} title={e.title} />
                            <Divider />

                            <CardHeader className={classes.cardHeader}
                                // avatar={<Avatar>A</Avatar>}
                                title={e.title} subheader={props.brands[e.brand].title} />
                            <CardContent>
                                <div className={classes.cardBody}>

                                    <Typography variant="body1" className={classes.cardLikes}>
                                        <Icon>favorite</Icon> &nbsp; by {e.likes} people
                                    </Typography>
                                </div>
                                <Chip label={props.categories[e.category].title} />
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.cardAction}>
                                <CartAddButton toyId={e.id} onlyButton={true} />
                                <Button variant="text" onClick={handleModalOpen(e.id)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {modalItem && <ToyModal toyId={modalItem} onClose={handleModalClose} />}

        </Container>
    )
}

const mapStateToProps = (state, ownProps) => ({
    toys: state.toys,
    apiStatus: state.api,
    brands: state.brands,
    categories: state.categories,
    cart: state.cart,

    state: state,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchToys: () => dispatch(apiCall({ route: apiRoutes.TOYS(), dataType: API_DATA_TYPE.TOYS })),
    addToCart: item => dispatch(cartAdd({ item })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
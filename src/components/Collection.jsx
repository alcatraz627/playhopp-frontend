import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import cx from 'classnames'
import _ from 'lodash'

import { apiCall, cartAdd, cartRemove } from '../actions'
import { getCardImage, apiRoutes, API_DATA_TYPE, API_STATES, API_METHODS } from '../constants/api'

import { Button, Fab, Chip, TextField, InputAdornment, Paper, Select, FormControl, InputLabel, Input, MenuItem } from '@material-ui/core'
import { Grid, Container, Divider, Avatar, Typography, Icon } from '@material-ui/core'
import { Card, CardContent, CardHeader, CardMedia, CardActions } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { red, grey, green } from '@material-ui/core/colors'

import CartAddButton from './shared/CartAddButton'
import ToyModal from './shared/ToyModal'
import OnboardingModal from './shared/OnboardingModal'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
        paddingTop: '40px',
    },
    searchResults: {
        marginTop: '30px',
        marginBottom: '30px',
        // backgroundColor: grey[200],
    },
    grow: {
        flexGrow: 1,
        // height: '100%'
    },
    cardContainer: {
        padding: '20px',
    },
    card: {
        maxWidth: 400,
        minWidth: 350,
        height: '100%',
        // margin: '10px auto',
        margin: 'auto',
        borderWidth: `1px`,
        borderStyle: `solid`,
        borderColor: grey[400],
    },
    cardSelected: {
        borderColor: green[400],
        // borderColor: theme.palette.primary.main,
        // backgroundColor: theme.palette.primary.main,
    },
    cardHeader: {
        height: '35px',
        alignItems: 'flex-start',
    },
    cardBody: {
        display: 'flex'
    },
    cardBodyContent: {
        width: '60%',
        padding: '6px 0px',
        borderRadius: '4px',
        backgroundColor: `${theme.palette.primary.main}0f`,
        alignItems: 'flex-end',
        textAlign: 'center',
        margin: 'auto 20%',
        // marginRight: '2.5%',
        // '&:nth-child(even)': {
        //     marginRight: '0%',
        //     marginLeft: '2.5%',
        // }
    },
    cardMedia: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        paddingTop: '80%',
        filter: 'grayscale(0.3)',
        cursor: 'pointer',
    },
    cardAction: {
    },
    cardLikes: {
        display: 'flex',
        color: red[500],
        padding: '10px 0',
    },
    hoppPoints: {
        color: theme.palette.primary.main,
        fontSize: theme.typography.h4.fontSize,
    },
    queryBar: {
        padding: '20px',
        border: `1px solid ${grey[200]}`,
    },
    filterChips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    filterChip: {
        margin: '0 5px',
    },
    paginator: {
        maxWidth: '500px',
        display: 'flex',
        margin: 'auto'
    }
}))

const SORT_OPTIONS = {
    EMPTY: {
        label: "None",
        sorter: x => x
    },
    ALPHA_A: {
        label: "Alphabetical | Ascending",
        sorter: x => x.title[0]
    },
    ALPHA_D: {
        label: "Alphabetical | Descending",
        sorter: x => -1 * x.title[0]
    },
    MIN_AGE_A: {
        label: "By min age | Ascending",
        sorter: x => x.minAge
    },
    MIN_AGE_D: {
        label: "By min age | Descending",
        sorter: x => -1 * x.minAge
    },
    MAX_AGE_A: {
        label: "By max age | Ascending",
        sorter: x => x.maxAge
    },
    MAX_AGE_D: {
        label: "By max age | Descending",
        sorter: x => -1 * x.maxAge
    },
    HOPP_POINTS_A: {
        label: "By hopp points | Ascending",
        sorter: x => x.points
    },
    HOPP_POINTS_D: {
        label: "By hopp points | Descending",
        sorter: x => -1 * x.points
    },
}


const Collection = props => {
    const classes = useStyles()

    const { toys, apiStatus, brands, categories, cart, user } = props
    const { fetchToys, addToCart, removeFromCart } = props

    const [searchQuery, setSearchQuery] = useState("") // Search query
    const [hoverCard, setHoverCard] = useState(null) // Which card to hover on
    const [modalItem, setModalItem] = useState(null) // Which toy to show in Toy Modal
    const [showOnboardingModal, setShowOnboardingModal] = useState(false) // Which toy to show in Toy Modal
    const [categoryFilters, setCategoryFilters] = useState([]) // List of category filters
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.EMPTY) // Which criteria to sort by

    // TODO: Fix search
    // Toys from store as an object to final to be displayed array
    // 1. obj to map
    let toysList = Object.values(toys)

    // 2. search
    // TODO: Improve
    // let searchCategories = e => [e.title, e.description, e.skills, e.playIdeas, categories[e.category].title, brands[e.brand].title]

    let searchCategories = e => [e.title, e.description, e.skills, e.playIdeas, categories[e.category].title, brands[e.brand].title]
    toysList = (searchQuery == '' || toysList.length == 0) ? toysList :
        (toysList.filter(e => searchCategories(e).map(f => f.includes(searchQuery)).reduce((a, v) => (a || v), false))) //if any field matches, it will return a true else default to false

    // toysList[0] && console.log("SQ:", searchCategories(toysList[0]).map(f => [f, searchQuery, f.includes(searchQuery)]))

    // 3. filter
    let categFiltered = Object.values(categories).filter(c => categoryFilters.includes(c.title)).map(c => c.id)
    toysList = (categoryFilters.length == 0) ? toysList : toysList.filter(t => categFiltered.includes(t.category))

    // 4. sort
    // let categFiltered = Object.values(categories).filter(c => categoryFilters.includes(c.title)).map(c => c.id)
    // toysList = toysList.sort(sortBy.sorter)
    toysList = _.sortBy(toysList, sortBy.sorter)
    // useEffect(() => {
    //     // toysList = toysList.sort(sortBy.sorter)
    //     toysList = ([...toysList].sort(sortBy.sorter))
    //     console.log("Updated!", sortBy)
    // }, [sortBy])

    // 5. paginate
    const ITEMS_PER_PAGE = 12; // TODO: Let users change
    const [pageNum, setPageNum] = useState(0) //Starts with zero
    const maxPageNum = Math.floor(toysList.length / ITEMS_PER_PAGE);
    toysList = toysList.slice((pageNum) * ITEMS_PER_PAGE + 1, ((pageNum + 1) * ITEMS_PER_PAGE) + 1)


    // Reset Page Number on search and filter change
    useEffect(() => { setPageNum(0) }, [searchQuery, categoryFilters,])

    // Show onboard modal IF not logged in AND cart.length >= 2
    useEffect(() => { 
        console.log("Changed card", !user.token, Object.values(cart).length);
        (!user.token && Object.values(cart).length > 0) && setShowOnboardingModal(true);
        console.log(showOnboardingModal);
    }, [cart,])

    // Handle the hook updation centrally from one method
    const handleMouseOver = (e) => (event) => { setHoverCard(e.id) }
    const handleMouseOut = (event) => { setHoverCard(null) }
    const handleToyModalOpen = id => event => { setModalItem(id) }
    const handleToyModalClose = event => { setModalItem(null) }
    const handleOnboardingModalClose = event => { setShowOnboardingModal(false) }
    const handlePageNumChange = p => e => { setPageNum(Math.max(p, 0)) }
    const handleSearchQueryChange = e => { setSearchQuery(e.target.value) }
    const handleFilterChange = e => { setCategoryFilters(e.target.value) }
    const handleSortChange = e => { setSortBy(Object.values(SORT_OPTIONS).filter(x => x.label == e.target.value)[0] ) }

    // style={{ backgroundColor: `url('https://dummyimage.com/600x400/000333/0011ff')` }}

    // const getCardImage = (id, k = 1) => {
    //     let imgUrl = `${apiUrl}/media/toys/${id}/${k}.jpg`
    //     let fallBack = 'https://dummyimage.com/600x400/000333/0011ff'
    //     let x = 'a';
    //     axios.get(`${apiUrl}/media/toys/${id}/${k}.jpg`)
    //         .then(resp => {
    //             x = resp.status == 200 ? imgUrl : fallBack
    //         })
    //     return x;
    // }


    const PaginatorComponent = () => (
        <div className={classes.paginator}>
            <Button size="small" variant="contained" color="primary" disabled={pageNum == 0} onClick={handlePageNumChange(pageNum - 1)}>&lt;</Button>
            <Button size="small" disabled={pageNum == 0} onClick={handlePageNumChange(0)}>First</Button>
            <div className={classes.grow} />
            {Object.keys(toys).length > 0 && [...Array(maxPageNum + 1).keys()]
                .filter(i => (i > pageNum - 2 && Math.abs(i - pageNum) < 3))
                .map(i => <Button size="small" onClick={handlePageNumChange(i)} key={i} 
                    {...{ color: (pageNum == i) ? "secondary" : "default", variant: (pageNum == i) ? "contained" : "text" }}>{i + 1}</Button>)
            }
            <div className={classes.grow} />
            <Button size="small" color="inherit" disabled={pageNum == maxPageNum} onClick={handlePageNumChange(maxPageNum)}>Last({maxPageNum + 1})</Button>
            <Button size="small" variant="contained" color="primary" disabled={pageNum == maxPageNum} onClick={handlePageNumChange(pageNum + 1)}>&gt;</Button>
        </div>
    )

    return (
        <Container className={classes.root} maxWidth="lg">
        <Typography variant="h4">Browse Toys{showOnboardingModal?"Y":"N"}</Typography>
            {/* {Object.keys(toys).length > 0 && [...Array(Object.keys(toys).length/10)].map(i => <div>{i} |</div>)} */}

            <Grid container spacing={0} className={classes.searchResults}>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.queryBar}>
                        <Grid container spacing={4}>
                            <Grid item sm={12} md={6}>
                                <TextField fullWidth label="Search" variant="standard" color="primary" value={searchQuery} onChange={handleSearchQueryChange}
                                    placeholder="Search" InputProps={{ startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment> }} />
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="select-category">Sort By</InputLabel>
                                    <Select fullWidth value={sortBy.label} input={<Input id="select-category" onChange={handleSortChange}
                                    startAdornment={<InputAdornment position="start"><Icon>sort</Icon></InputAdornment>}/>}>
                                        {Object.values(SORT_OPTIONS).map(e => e.label).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="select-category">Filter By Category</InputLabel>
                                    <Select fullWidth multiple value={categoryFilters} input={<Input id="select-category" onChange={handleFilterChange}
                                            startAdornment={<InputAdornment position="start"><Icon>filter_list</Icon></InputAdornment>}
                                        />} renderValue={selected => <div className={classes.filterChips}>{categoryFilters.map(e => <Chip key={e} label={e} className={classes.filterChip} />)}</div>}>
                                        {Object.values(categories).map(e => e.title).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {PaginatorComponent()}
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>

                {toysList ? toysList.map(e => (
                    <Grid key={e.id} item xs={12} sm={12} md={4} lg={4} className={classes.cardContainer}>
                        <Card className={cx(classes.card, cart[e.id] && classes.cardSelected )} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver(e)} elevation={hoverCard == e.id ? 2 : 0}>
                            <CardMedia className={classes.cardMedia} title={e.title} image={getCardImage(e.id)}  onClick={handleToyModalOpen(e.id)} />
                            <Divider />

                            <CardHeader className={classes.cardHeader}
                                // avatar={<Avatar>A</Avatar>}
                                // Truncate the title to 32 characters
                                title={e.title.slice(0, 32)} subheader={brands[e.brand].title} titleTypographyProps={{variant: 'h6'}} />
                            <CardContent>
                                <div className={classes.cardBody}>

                                    {/* <Typography variant="body1" className={classes.cardLikes}>
                                        <Icon>favorite</Icon> &nbsp; by {e.likes} people
                                    </Typography> */}
                                    {/* <Typography variant="body2">Hopp Points: {e.points}</Typography> */}
                                    <div className={classes.cardBodyContent}>
                                        <Typography variant="caption">
                                            Hopp Point{e.points != 1 && "s"}
                                        </Typography>
                                        <Typography variant="h4" color="primary">{e.points}</Typography>
                                    </div>
                                    {/* <div className={classes.cardBodyContent}>
                                        <Typography variant="caption">Ages</Typography>
                                        <Typography variant="h4" color="primary">{e.minAge} - {e.maxAge}</Typography>
                                    </div> */}
                                </div>
                                <br />
                                <Chip label={categories[e.category].title} />
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.cardAction}>
                                <CartAddButton toyId={e.id} onlyButton={true} />
                                <Button variant="text" onClick={handleToyModalOpen(e.id)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )) : "Loading..."}
            </Grid>
            {PaginatorComponent()}
            <br />
            <br />
            {modalItem && <ToyModal toyId={modalItem} onClose={handleToyModalClose} />}
            {showOnboardingModal && <OnboardingModal open={showOnboardingModal} onClose={handleOnboardingModalClose}/>}
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => ({
    toys: state.toys,
    apiStatus: state.api,
    brands: state.brands,
    categories: state.categories,
    cart: state.cart,
    user: state.user,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchToys: () => dispatch(apiCall({ route: apiRoutes.TOYS(), dataType: API_DATA_TYPE.TOYS })),
    addToCart: item => dispatch(cartAdd({ item })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
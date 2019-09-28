import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import axios from 'axios'

import { apiCall, cartAdd, cartRemove } from '../actions'
import { getCardImage, apiRoutes, API_DATA_TYPE, API_STATES, API_METHODS } from '../constants/api'

import { Button, Fab, Chip, TextField, InputAdornment, Paper, Select, FormControl, InputLabel, Input, MenuItem } from '@material-ui/core'
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
        flexGrow: 1,
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


const Collection = props => {
    const classes = useStyles()

    const { toys, apiStatus, brands, categories, cart } = props
    const { fetchToys, addToCart, removeFromCart } = props

    useEffect(() => {
        (apiStatus[API_DATA_TYPE.BRANDS] == API_STATES.FETCHED) &&
            (apiStatus[API_DATA_TYPE.CATEGORIES] == API_STATES.FETCHED) &&
            (apiStatus[API_DATA_TYPE.TOYS] == API_STATES.NOT_FETCHED) && fetchToys()
    }, [apiStatus])


    const [searchQuery, setSearchQuery] = useState("")
    const [hoverCard, setHoverCard] = useState(null)
    const [modalItem, setModalItem] = useState(null)
    const [categoryFilters, setCategoryFilters] = useState([])
    const [categorySort, setCategorySort] = useState(null)

    // Toys from store as an object to final to be displayed array
    // 1. obj to map
    let toysList = Object.values(toys)

    // 2. search
    let searchCategories = e => [e.title, e.description, e.skills, e.playIdeas, categories[e.category].title, brands[e.brand].title]
    toysList = (searchQuery == '' || toysList.length == 0) ? toysList :
        (toysList.filter(e => searchCategories(e).map(f => f.includes(searchQuery)).reduce((a, v) => (a || v), false))) //if any field matches, it will return a true else default to false

    // 3. filter & sort
    // TODO
    let categFiltered = Object.values(categories).filter(c => categoryFilters.includes(c.title)).map(c => c.id)
    // console.log('categFiltered', categFiltered)
    toysList = (categoryFilters.length == 0) ? toysList : toysList.filter(t => categFiltered.includes(t.category))

    // 4. paginate
    const ITEMS_PER_PAGE = 12; // TODO: Let users change
    const [pageNum, setPageNum] = useState(0) //Starts with zero
    const maxPageNum = Math.floor(toysList.length / ITEMS_PER_PAGE);
    toysList = toysList.slice((pageNum) * ITEMS_PER_PAGE + 1, ((pageNum + 1) * ITEMS_PER_PAGE) + 1)

    // Reset Page Number on search and filter change
    useEffect(() => { setPageNum(0) }, [searchQuery, categoryFilters,])

    // Handle the hook updation centrally from one method
    const handleMouseOver = (e) => (event) => { setHoverCard(e.id) }
    const handleMouseOut = (event) => { setHoverCard(null) }
    const handleModalOpen = id => event => { setModalItem(id) }
    const handleModalClose = event => { setModalItem(null) }
    const handlePageNumChange = p => e => { setPageNum(p) }
    const handleSearchQueryChange = e => { setSearchQuery(e.target.value) }
    const handleFilterChange = e => { setCategoryFilters(e.target.value); console.log(e.target) }

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
            <Button size="small" variant="contained" color="primary">&lt;</Button>
            <Button size="small" disabled={pageNum == 0} onClick={handlePageNumChange(0)}>First</Button>
            <div className={classes.grow} />
            {Object.keys(toys).length > 0 && [...Array(maxPageNum + 1).keys()]
                .filter(i => (Math.abs(i - pageNum) < 3))
                .map(i => <Button {...{ color: (pageNum == i) ? "secondary" : "default", variant: (pageNum == i) ? "contained" : "text" }} size="small" onClick={handlePageNumChange(i)} key={i}>{i + 1}</Button>)
            }
            <div className={classes.grow} />
            <Button size="small" color="inherit" disabled={pageNum == maxPageNum} onClick={handlePageNumChange(maxPageNum)}>Last({maxPageNum + 1})</Button>
            <Button size="small" variant="contained" color="primary">&gt;</Button>
        </div>
    )

    return (
        <Container className={classes.root}>
            <Typography variant="h4">Browse Toys</Typography>
            {/* {Object.keys(toys).length > 0 && [...Array(Object.keys(toys).length/10)].map(i => <div>{i} |</div>)} */}

            <Grid container spacing={0} className={classes.searchResults}>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.queryBar}>
                        <Grid container spacing={4}>
                            <Grid item sm={12} md={4}>
                                <TextField fullWidth label="Search" variant="standard" color="primary" value={searchQuery} onChange={handleSearchQueryChange}
                                    placeholder="Search" InputProps={{ startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment> }} />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="select-category">Filter By Category</InputLabel>
                                    <Select fullWidth multiple value={categoryFilters}
                                        input={<Input id="select-category" onChange={handleFilterChange}
                                            startAdornment={<InputAdornment position="start"><Icon>filter_list</Icon></InputAdornment>}
                                        />} renderValue={selected => <div className={classes.filterChips}>{categoryFilters.map(e => <Chip key={e} label={e} className={classes.filterChip} />)}</div>}>
                                        {Object.values(categories).map(e => e.title).map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Sort By [TODO]</InputLabel>
                                    <Select fullWidth multiple value={[]}
                                        input={<Input id="select-category" startAdornment={<InputAdornment position="start"><Icon>sort</Icon></InputAdornment>} />}>
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
                    <Grid key={e.id} item xs={12} sm={12} md={4} lg={3} className={classes.cardContainer}>
                        <Card className={classes.card} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver(e)} elevation={hoverCard == e.id ? 2 : 0}>
                            <CardMedia className={classes.cardMedia} title={e.title} image={getCardImage(e.id)} />
                            <Divider />

                            <CardHeader className={classes.cardHeader}
                                // avatar={<Avatar>A</Avatar>}
                                title={e.title} subheader={brands[e.brand].title} />
                            <CardContent>
                                <div className={classes.cardBody}>

                                    <Typography variant="body1" className={classes.cardLikes}>
                                        <Icon>favorite</Icon> &nbsp; by {e.likes} people
                                    </Typography>
                                </div>
                                <Chip label={categories[e.category].title} />
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.cardAction}>
                                <CartAddButton toyId={e.id} onlyButton={true} />
                                <Button variant="text" onClick={handleModalOpen(e.id)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )) : "Loading..."}
            </Grid>
            {PaginatorComponent()}
            <br />
            <br />
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
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchToys: () => dispatch(apiCall({ route: apiRoutes.TOYS(), dataType: API_DATA_TYPE.TOYS })),
    addToCart: item => dispatch(cartAdd({ item })),
    removeFromCart: item => dispatch(cartRemove({ item })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
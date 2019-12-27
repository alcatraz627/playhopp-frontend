import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, Typography, Button, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Slider from 'react-slick'

import { getCardImage } from '../../constants/api'

import CartAddButton from './CartAddButton'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '900px'
    },
    itemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    itemDesc: {
        textAlign: 'center',
        backgroundColor: `${theme.palette.primary.main}0f`,
        width: '30%',
        padding: '12px 0px',
        borderRadius: '4px',
    },
    carouselImageContainer: {
        border: `2px solid ${theme.palette.grey[400]}`,
    },
    carouselDots: {
        width: '30px',
        border: '1px dotted red',
    },
    carouselDotsContainer: {
        border: '1px dashed green',
        display: 'flex',
        justifyContent: 'space-evenly',
    }

}))

const ToyModal = props => {

    const classes = useStyles()

    let { toyId, onClose } = props
    let { brand, category, toy } = props

    const sliderSettings = {
        autoplay: true,
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // appendDots: dots => <div><ul className={classes.carouselDotsContainer}>{dots}</ul></div>,
        // customPaging: i => <a className={classes.carouselDots}><img width="50px" src={getCardImage(toyId)} /></a>
    }

    return toy ? (
        <Dialog open={toy !== null} onClose={onClose} classes={{ paper: classes.root }}>
            <DialogTitle disableTypography>
                <Typography variant="h5">{toy.title}</Typography>
                <Typography color="textSecondary" variant="subtitle2">By: {brand}</Typography>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item md={6} sm={12}>
                        {/* <img src={getCardImage(toyId)} width="100%" /> */}
                        <Slider {...sliderSettings} className={classes.carouselImageContainer}>
                            {
                                ["First", "Second", "Third"].map(e => <div key={e}>
                                    <div>
                                        <img src={getCardImage(toyId)} width="100%" />
                                    </div>
                                </div>)
                            }
                        </Slider>

                        <br />
                        <br />
                        <br />
                        <div className={classes.itemContainer}>
                        {/* <Grid container justify="space-evenly" spacing={3}> */}
                            {/* <Grid item md={4} className={classes.itemDesc}> */}
                            <div className={classes.itemDesc}>
                                <Typography variant="body2">Hopp Points</Typography>
                                <Typography variant="h4" color="primary">{toy.points}</Typography>
                            </div>
                            {/* </Grid> */}
                            {/* <Grid item md={4} className={classes.itemDesc}> */}
                            <div className={classes.itemDesc}>
                                <Typography variant="body2">Age Group</Typography>
                                <Typography variant="h4" color="primary">{toy.minAge} - {toy.maxAge}</Typography>
                            </div>
                            {/* </Grid> */}
                            {/* <Grid item md={4} className={classes.itemDesc}> */}
                            <div className={classes.itemDesc}>
                                <Typography variant="body2">No. of Pieces</Typography>
                                <Typography variant="h4" color="primary">{toy.piecesNumber}</Typography>
                            </div>
                            {/* </Grid> */}
                        {/* </Grid> */}
                        </div>
                        {/* <Typography variant="subtitle1">Ages: {toy.minAge} to {toy.maxAge}</Typography> */}
                        {/* <Chip label={`Number of Pieces: ${toy.piecesNumber}`} variant="outlined" /> */}
                        <Chip label={category} color="secondary" />&nbsp; &nbsp; &nbsp;
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Typography variant="h6">About</Typography>
                        <Typography variant="body1">{toy.description}</Typography>
                        <br />
                        <Typography variant="h6">Skills it will develop</Typography>
                        <Typography variant="body1">{toy.skills}</Typography>
                        <br />
                        <Typography variant="h6">Play Ideas</Typography>
                        <Typography variant="body1">{toy.playIdeas}</Typography>

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <CartAddButton toyId={toyId} />
                <Button variant="text" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    ) : "Loading..."
}

const mapStateToProps = (state, ownProps) => {
    let toy = ownProps.toyId ? state.toys[ownProps.toyId] : null;

    return {
        toy,
        brand: toy ? state.brands[toy.brand].title : null,
        category: toy ? state.categories[toy.category].title : null,
    }
}

export default connect(mapStateToProps)(ToyModal)
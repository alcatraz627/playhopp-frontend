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
    carouselImageContainer: {
        border: '4px solid #444',
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
            <DialogTitle>
                About the Toy
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item sm={5}>
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
                        <Typography variant="subtitle1">Ages: {toy.minAge} to {toy.maxAge}</Typography>
                        <Chip label={category} color="secondary" />&nbsp; &nbsp; &nbsp;
                        <Chip label={`Number of Pieces: ${toy.piecesNumber}`} variant="outlined" />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography variant="h4">{toy.title}</Typography>
                        <Typography color="textSecondary" variant="subtitle2">By: {brand}</Typography>
                        <br />
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
import React from 'react'
import Slider from 'react-slick'

import classnames from 'classnames'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Typography, Container, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    carouselDummy: {
        background: 'linear-gradient(#0a73af, #30cdd7)',
        padding: '400px 50px 50px',
    },
    white: {
        color: 'white'
    },
    container: {
        padding: '100px 50px',
    },
    containerHeader: {
    },
    containerUnderline: {
        // padding: '20px 2px',
        width: '100px',
        margin: '20px auto 30px',
        padding: '1.5px 1px',
        borderRadius: '1000px',
        backgroundColor: theme.palette.secondary.main,
    },
    greyContainer: {
        backgroundColor: theme.palette.grey[200],
        width: '100%',
    },

    circle: {
        height: '200px',
        width: '200px',
        backgroundColor: theme.palette.grey[200],
        borderRadius: '100%',
        margin: '20px auto'
    },
    lipsum: {
        textAlign: 'justify'
    },
    inline: {
        display: 'inline-flex',
        alignItems: 'last baseline'
    },
    textcenter: {
        textAlign: 'center',
        margin: 'auto'
    },

    space: {
        padding: '300px 100px',
        backgroundColor: theme.palette.grey[300],
    },
    video: {
        // padding: '100px 100px',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.grey[900],
    }
}))

const HomePage = props => {
    const classes = useStyles();

    // Docs: https://react-slick.neostack.com/docs/api#accessibility
    const sliderSettings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div>
            <Slider {...sliderSettings}>
                {
                    ["First", "Second", "Third"].map(e => <div key={e}>
                        <div className={classes.carouselDummy}>
                            <Typography variant="h1" className={classes.white}>{e} Slide</Typography>
                            <Typography variant="h4" className={classes.white}>This is the text for the {e} slide.</Typography>
                        </div>
                    </div>)
                }
            </Slider>

            <Container className={classnames(classes.textcenter, classes.container)}>
                <Typography variant="h4" color="textPrimary" className={classes.containerHeader}>6 ways PlayHopp helps your child</Typography>
                <Divider className={classes.containerUnderline} />
                <Grid container spacing={8}>
                    {[1, 2, 3, 4, 5, 6].map(e =>
                        <Grid item key={e} lg={4} sm={6} xs={12}>
                            <div className={classes.circle} />
                            <Typography variant="body1" className={classes.lipsum}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>

            <div className={classes.greyContainer}>
                <Container className={classnames(classes.textcenter, classes.container)}>
                    <Typography variant="h4" color="textPrimary" className={classes.containerHeader}>How PlayHopping works</Typography>
                    <Divider className={classes.containerUnderline} />
                    <div className={classes.space} />
                </Container>
            </div>

            <Container className={classnames(classes.textcenter, classes.container)}>
                <Typography variant="h4" color="textPrimary" className={classes.containerHeader}>Toy Sanitation</Typography>
                <Divider className={classes.containerUnderline} />
                <Grid container spacing={8}>
                    <Grid item sm={12} md={6}>
                        <div className={classes.video}>
                            <Typography variant="body2" className={classes.white}>[Video embed]</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Typography variant="body1" align="justify">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                           <br /><br />
                            Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?                         </Typography>
                    </Grid>
                </Grid>
            </Container>

            <div className={classes.greyContainer}>
                <Container className={classnames(classes.textcenter, classes.container)}>
                    <Typography variant="h4" color="textPrimary" className={classes.containerHeader}>Testimonials</Typography>
                    <Divider className={classes.containerUnderline} />
                    <div className={classes.space} />
                </Container>
            </div>

            <Container className={classnames(classes.textcenter, classes.container)}>
                <Typography variant="h4" color="textPrimary" className={classes.containerHeader}>Sustainable Play</Typography>
                <Divider className={classes.containerUnderline} />
                <div className={classes.space} />
            </Container>



        </div>
    )
}

export default HomePage
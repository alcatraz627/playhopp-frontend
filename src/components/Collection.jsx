import React, { useState } from 'react'

import { connect } from 'react-redux'

import { addToys } from '../actions'

import { Grid, Card, CardContent, CardHeader, CardMedia, CardActionArea, CardActions, Container, Divider, Avatar, Button, Typography, Icon, Chip, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import { collection } from '../constants/models'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
        paddingTop: '40px',
    },
    grow: {
        // flexGrow: 1,
        // height: '100%'
    },
    card: {
        // maxWidth: 345,
        height: '100%',
    },
    cardHeader: {
        height: '60px',
        alignItems: 'flex-start',
    },
    cardBody: {
        height: '100px',
        alignItems: 'flex-start',
        padding: '0 0 20px',
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
    favIcon: {}
}))



const Collection = props => {
    const classes = useStyles()

    const [hoverCard, setHoverCard] = useState(null)

    const handleMouseOver = (e) => (event) => {
        setHoverCard(e.id)
    }

    const handleMouseOut = (event) => {
        setHoverCard(null)
    }

    React.useEffect(() => {
        console.log(props.toys)
    }, [props.toys])

    // - search
    // - sort
    // - filter
    return (
        <Container className={classes.root}>
            <Typography variant="h4">Browse Toys</Typography>
            <Grid container style={{ margin: '30px 0' }}>
                <Grid item>
                    <TextField variant="standard" color="primary" placeholder="Search" InputProps={{ startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment> }} />
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={4} >
                {props.toys.map(e => (
                    <Grid key={e.id} item xs={12} sm={6} md={4}>
                        <Card className={classes.card} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver(e)} elevation={hoverCard == e.id ? 4 : 2}>
                            <CardMedia className={classes.cardMedia} image={e.primaryImage} title={e.title} />
                            <Divider />

                            <CardHeader className={classes.cardHeader}
                                // avatar={<Avatar>A</Avatar>}
                                title={e.title} subheader={e.brand} />
                            <CardContent>
                                <div className={classes.cardBody}>

                                    <Typography variant="body1" className={classes.cardLikes}>
                                        <Icon>favorite</Icon>&nbsp; &bull; 300 people
                                    </Typography>
                                    {/* <Typography variant="h6">{e.title}</Typography> */}
                                    <Typography variant="body2">{e.brief}</Typography>
                                </div>
                                <Chip label={e.category} />
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.cardAction}>
                                <Button color="primary"><Icon>library_add</Icon>&nbsp;Add to Cart</Button>
                                <Button variant="text">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={()=>{props.addToy()}}>Add Toy</Button>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => ({
    toys: state.toys
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addToy: () => dispatch(addToys(
        {
            title: 'Pretend Police Play with Police Van',
            brief: 'Learn to be a kids Police Inspector and arrest the criminals in your area',
            description: 'Learn to be a kids Police Inspector and arrest the criminals in your area with your friends with the Police Storage kit with Bang-Bang Sound Gun for kids children. Never let the thief run away from your 24/7 Guard Vehicle Truck. Be on the lookout for the baddies and put them behind the bar with this awesome pretend play police truck car for toddlers and infants play. Long hours of safe and fun playing.',
            skills: "1) Communication Skills - Helps to learn communicate child's thoughts with clarity2) Encourages imagination and creativity as your child imagines different scenarios and different role plays and builds different items3)  Problem Solving and decision Making Skills - Your child is the boss, they decide what to play, how to play and lead the play. 4) Memory Skills - Pretend play is the best way to build your child's play. Children recreate their past experiences. Did they ever see a police officer? Your child will imitate all that they observed while they were there.",
            playIdeas: "Create various scenarios of crimes and save the world from them.",
            brand: 'Toy Shine',
            primaryImage: 'https://static.wixstatic.com/media/c41d1d_927c1703a2364f838c5367a3280f0999~mv2.jpg/v1/fill/w_1024,h_647,al_c,q_85/Toyshine%20Pretend%20Police%20Play%20with%20Police.webp',
            images: ['', '', ''],
            minAge: 3,
            maxAge: 8,
            category: "Pretend Play Sets"
        }
    ))
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
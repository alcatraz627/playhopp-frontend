import React, { useState } from 'react'

import { Grid, Card, CardContent, CardHeader, CardMedia, CardActionArea, CardActions, Container, Divider, Avatar, Button, Typography, Icon, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import { collection } from '../constants/models'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
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

    return (
        <Container className={classes.root}>
            <Grid container spacing={4} >
                {collection.map(e => (
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
        </Container>
    )
}

export default Collection
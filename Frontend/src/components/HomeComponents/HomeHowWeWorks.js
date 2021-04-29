import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Container,Box } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(() => ({
  img: {
  },

  textDetail: {
    textAlign: "center",
  },
}))

export default function HomeFeedback({src1,src2,src3}) {
  const classes = useStyles()

  return (
    <Box>
      <Container maxWidth="xl">

        <CardContent className={classes.textDetail}>
          <Typography 
            variant="h3"
            component="h3"
          >
            How we works.
          </Typography>
        </CardContent>
      
        <Grid container spacing={0}>
          <Grid item xs={12} md={4}>
            <CardContent className={classes.img}>
              <CardMedia
                component="img"
                alt="How we works image"
                image={src1}
                title="How we works image"
              />
            </CardContent>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardContent className={classes.img}>
              <CardMedia
                component="img"
                alt="How we works image"
                image={src2}
                title="How we works image"
              />
            </CardContent>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardContent className={classes.img}>
              <CardMedia
                component="img"
                alt="How we works image"
                image={src3}
                title="How we works image"
              />
            </CardContent>
          </Grid>         
        </Grid>
      </Container>
    </Box>
  )
}


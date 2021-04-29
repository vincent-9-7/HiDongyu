import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container , Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },

  img: {
    marginBottom: '55px',
    marginTop: '55px',
    
    '& img': {
      height: '60vh',
    }
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    justifyContent: 'center',
    marginTop: '95px',
    textAlign: "right",
    [theme.breakpoints.down('sm')]: {
      height: '0vh',
      marginTop: '0px',
    },
  },

  button: {
    color: theme.palette.primary.main,
    justifyContent: 'center',
    marginBottom: '25px',
    paddingTop: 0,
  },
}))

export default function HomeFeedback({src,title,subtitle,name}) {
  const classes = useStyles()

  return (
    <Box>
      <Container maxWidth="xl" className={classes.root}>
        <Card>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <Container maxWidth="sm">
                <CardContent className={classes.img}>
                  <CardMedia
                    component="img"
                    alt="User Image"
                    image={src}
                    title="User Image"
                  />
                </CardContent>
              </Container>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Container maxWidth="sm">
                <CardContent className={classes.text}>
                  <Typography 
                    variant="h3"
                    component="h3"
                  >
                    {title}
                  </Typography>

                  <Typography 
                    variant="h4"
                    component="h4"
                  >
                    {subtitle}
                  </Typography>

                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="h5"
                  >
                    {name}
                  </Typography>
                </CardContent>
              </Container>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  )
}


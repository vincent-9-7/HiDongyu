import React from 'react'
import { Grid, makeStyles, Container } from '@material-ui/core'
import { RedStatus } from '../../UIComponents/Status'

const navBarStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    paddingTop: 4,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
}))

export default function ContainedButtons() {
  const classes = navBarStyles()
  return (
    <Grid container className={classes.container}>
      <Container>
        <RedStatus>UNASSGINED</RedStatus>
      </Container>
    </Grid>
  )
}

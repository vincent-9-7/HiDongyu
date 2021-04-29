import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { LocationOn } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10
  },
  textcolor: {
    color: '#007bf5'
  },
}))

export default function Location(props) {
  const classes = useStyles()
  const { address } = props
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <LocationOn />
      </Grid>
      <Grid item xs={10} sm={11} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">ADDRESS</Typography>
        <Typography variant="body2">{address}</Typography>
      </Grid>
    </Box>
  )
}

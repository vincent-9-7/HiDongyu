import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import PhoneIcon from '@material-ui/icons/Phone'

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
  const { phoneNumber } = props
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <PhoneIcon />
      </Grid>
      <Grid item xs={10} sm={11} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">PHONE NUMBER</Typography>
        <Typography variant="body2">{phoneNumber}</Typography>
      </Grid>
    </Box>
  )
}

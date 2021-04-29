import React from 'react'
import { makeStyles, Box, Grid, Typography } from '@material-ui/core'
import { deepPurple, deepOrange } from '@material-ui/core/colors'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'


const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
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

export default function Names(props) {
  const classes = styles()
  const { firstName, lastName } = props
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <AccountCircleIcon />
      </Grid>
      <Grid item xs={9} sm={10} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">CONTACT</Typography>
        <Grid container direction="row" justify="space-between" space={5}>
          <Typography variant="body2">
            {firstName[0].toUpperCase()}
            {firstName.slice(1)}
            {' '}
            {lastName[0].toUpperCase()}
            {lastName.slice(1)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

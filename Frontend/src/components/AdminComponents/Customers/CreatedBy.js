import React from 'react'
import { makeStyles, Box, Grid, Typography, Link } from '@material-ui/core'
import { deepPurple, deepOrange } from '@material-ui/core/colors'
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded'
import { Link as RouterLink } from 'react-router-dom'


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
  black: {
    backgroundColor: "#000a12",
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
  textcolor: {
    color: '#007bf5'
  },
  linkcolor: {
    color: 'black',
  }
}))

export default function CreatBy(props) {
  const classes = styles()
  const { firstName, lastName, userObjectID } = props
  const path = `/admin/customers/${userObjectID}`
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <AssignmentIndRoundedIcon />
      </Grid>
      <Grid item xs={9} sm={10} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">CREATE BY</Typography>
        <Grid container direction="row" justify="space-between">
          <Link className={classes.linkcolor} component={RouterLink} to={path} variant="subtitle2">
            {firstName[0].toUpperCase()}
            {firstName.slice(1)}
            {' '}
            {lastName[0].toUpperCase()}
            {lastName.slice(1)}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

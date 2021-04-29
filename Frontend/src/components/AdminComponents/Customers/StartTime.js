/* eslint-disable */
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import date from 'date-and-time'
import { Today } from '@material-ui/icons'

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

function displayTime(time) {
  try {
    let result = date.parse(time.split('.')[0], 'YYYY-MM-DD hh:mm:ss')
    result = result.toString().split(" ")
    return `${date.transform(result[4], 'HH:mm:ss', 'hh:mmA')},  
  ${result[2]} ${result[1]}, ${result[3]}`

  } catch {
    return "There's no exact time in this part. "
  }

}

export default function StartTime(props) {
  const classes = useStyles()
  const { startTime } = props
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <Today />
      </Grid>
      <Grid item xs={10} sm={11} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">START TIME</Typography>
        <Typography variant="body2">{displayTime(startTime)}</Typography>
      </Grid>
    </Box>
  )
}

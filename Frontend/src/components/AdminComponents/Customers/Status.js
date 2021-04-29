/* eslint-disable */
import React from 'react'
import { Grid, makeStyles, Box } from '@material-ui/core'
import AssessmentIcon from '@material-ui/icons/Assessment';
import { GreenStatus, GreyStatus, RedStatus, YellowStatus, BlueStatus } from '../../UIComponents/Status'

const useStyles = makeStyles(() => ({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10
  },
}))

export default function Status(props) {
  const classes = useStyles()
  const { status } = props
  const uppercaseStatus = status.toUpperCase()
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <AssessmentIcon />
      </Grid>
      <Grid item xs={10} sm={11} className={classes.text}>
        {(status === 'confirmed') && (<GreenStatus>{uppercaseStatus}</GreenStatus>)}
        {(status === 'in-progress') && (<BlueStatus>{uppercaseStatus}</BlueStatus>)}
        {(status === 'finished') && (<GreyStatus>{uppercaseStatus}</GreyStatus>)}
        {(status === 'cancelled') && (<RedStatus>{uppercaseStatus}</RedStatus>)}
      </Grid>
    </Box>
  )
}
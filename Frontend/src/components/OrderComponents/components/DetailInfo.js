import React from "react"
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import BathroomPicker from '../../HomeComponents/components/BathroomPicker'
import BedroomPicker from '../../HomeComponents/components/BedroomPicker'
import TypePicker from '../../HomeComponents/components/TypePicker'
import PostcodeInput from '../../HomeComponents/components/PostcodeInput'
import DatePicker from '../../HomeComponents/components/DatePicker'
import TimePicker from '../../HomeComponents/components/TimePicker'


const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '10px',
    marginTop: '5px',
  },
}))

export default function DetailInfo() {
  const classes = useStyles()


  return(
    <Grid container direction="row" spacing={2} className={classes.root}>
      <Grid item xs={6} sm={6}>
        <BathroomPicker />
      </Grid>
      <Grid item xs={6} sm={6}>
        <BedroomPicker />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TypePicker />
      </Grid>
      <Grid item xs={6} sm={6}>
        <PostcodeInput />
      </Grid>
      <Grid item xs={6} sm={6}>
        <DatePicker />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TimePicker />
      </Grid>
    </Grid>
  )
}


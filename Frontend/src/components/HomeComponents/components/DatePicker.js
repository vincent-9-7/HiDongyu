import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers"
import InputLabel from '@material-ui/core/InputLabel'

import HomeComponentStyle from '../styles/HomeComponentStyle'
import getTime from './getTime'


export default function MaterialUIPickers() {
  const classes = HomeComponentStyle()
  const time = getTime()
  const [selectedDate, setSelectedDate] = React.useState(new Date(`${time}`))

  const changeHandler = (date) => {
    setSelectedDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel 
        className={classes.datePicker}
      >
        Date:
      </InputLabel>
      <KeyboardDatePicker
        className={classes.datePicker}
        id="date-picker-dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={changeHandler}
        KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
      />
    </MuiPickersUtilsProvider>
  )
}
import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers'
import InputLabel from '@material-ui/core/InputLabel'
import getTime from './getTime'
import HomeComponentStyle from '../styles/HomeComponentStyle'


export default function MaterialUIPickers() {
  const time = getTime()
  const classes = HomeComponentStyle()
  const [selectedTime, setSelectedTime] = React.useState(new Date(`${time}`))

  const changeHandler = (date) => {
    setSelectedTime(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel 
        className={classes.datePicker}
      >
        Time:
      </InputLabel>
      <KeyboardTimePicker
        id="time-picker"
        value={selectedTime}
        onChange={changeHandler}
        className={classes.datePicker}
        KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
      />
    </MuiPickersUtilsProvider>
  )
}

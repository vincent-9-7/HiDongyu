import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import HomeComponentStyle from '../styles/HomeComponentStyle'


export default function BathroomPicker() {
  const classes = HomeComponentStyle()
  const [bathRoomNum, setBathRoomNum] = React.useState('')

  const changeHandler = (event) => {
    setBathRoomNum(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <FormControl className={classes.Picker} onSubmit={submitHandler}>
        <InputLabel
          id="demo-simple-select-filled-label"
          className={classes.Picker}
        >
          Bathroom
        </InputLabel>
        
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={bathRoomNum}
          name="bathRoomNum"
          onChange={changeHandler}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
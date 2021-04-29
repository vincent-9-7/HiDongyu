import React from 'react'
import TextField from '@material-ui/core/TextField'
import HomeComponentStyle from '../styles/HomeComponentStyle'

export default function BasicTextFields() {
  const classes = HomeComponentStyle()
  const [postcode, setPostcode] = React.useState('')

  const changeHandler = (event) => {
    setPostcode(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <form 
      className={classes.Picker}
      noValidate 
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <TextField
        value={postcode} 
        id="standard-basic"
        label="Post Code"
        className={classes.postCodeLength}
        onChange={changeHandler}
      />
    </form>
  )
}
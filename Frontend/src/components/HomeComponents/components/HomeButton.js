import React from "react"
import Button from '@material-ui/core/Button'
import {buttonStyle} from '../../../styles/styles'

export default function HomeButton() {
  const classes = buttonStyle()

  return(
    <>
      <Button
        className={classes.bookingButton}
        variant="contained"
        type="submit"
        id="back-to-top-anchor" 
      >
        Booking from $80
      </Button>
    </>
  )
}
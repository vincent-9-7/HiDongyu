import React from "react"
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import {buttonStyle} from './styles/styles'
import './styles/Style.scss'



export function PopupButton() {
  const classes = buttonStyle()
  return(
    <>
      <Button
        className={classes.homeBookingButton}
        type="submit"
      >
        Sign Up
      </Button>
    </>
  )
}
export function PopupLoginButton() {
  const classes = buttonStyle()
  return(
    <>
      <Button
        className={classes.homeBookingButton}
        type="submit"
      >
        Login
      </Button>
    </>
  )
}

export function FbButton() {  
  const classes = buttonStyle()
  return(
    <>
      <Button
        className={classes.faceBookButton}
        variant="contained"
        type="submit"
      >
        <FontAwesomeIcon className='facebook' icon={faFacebook} />
        Facebook
      </Button>
    </>
  )
}



export function ConfirmButton() {
  const classes = buttonStyle()
  return(
    <>
      <Button
        className={classes.homeBookingButton}
        type="submit"
      >
        Confirm
      </Button>
    </>
  )
}



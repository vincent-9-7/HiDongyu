import React from 'react'
import { Button } from '@material-ui/core'
import { buttonStyle } from '../../styles/styles'

export function PrimaryButton(props) {
  const styles = buttonStyle()
  const { children } = props
  return <Button className={styles.primaryButton}>{children}</Button>
}

export function SecondaryButton(props) {
  const styles = buttonStyle()
  const { children } = props
  return <Button className={styles.secondaryButton}>{children}</Button>
}

export function BookingButton(props) {
  const styles = buttonStyle()
  const { children } = props
  return (
    <Button 
      type="submit"
      className={styles.bookingButton}
    >
      {children}
    </Button>
)
}

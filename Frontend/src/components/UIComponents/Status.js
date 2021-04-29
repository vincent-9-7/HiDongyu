import React from 'react'
import { Button } from '@material-ui/core'
import { statusStyle } from '../../styles/styles'

export function GreenStatus(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button disabled classes={{ disabled: styles.green }}>
      {children}
    </Button>
  )
}

export function RedStatus(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button disabled classes={{ disabled: styles.red }}>
      {children}
    </Button>
  )
}

export function BlueStatus(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button disabled classes={{ disabled: styles.blue }}>
      {children}
    </Button>
  )
}

export function GreyStatus(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button
      disabled
      classes={{
        disabled: styles.grey,
      }}
    >
      {children}
    </Button>
  )
}

export function YellowStatus(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button
      disabled
      classes={{
        disabled: styles.yellow,
      }}
    >
      {children}
    </Button>
  )
}

export function GreenStatusSquare(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button disabled classes={{ disabled: styles.greenSquare }}>
      {children}
    </Button>
  )
}

export function RedStatusSquare(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button disabled classes={{ disabled: styles.redSquare }}>
      {children}
    </Button>
  )
}

export function BlueStatusSquare(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button disabled classes={{ disabled: styles.blueSquare }}>
      {children}
    </Button>
  )
}

export function GreyStatusSquare(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button
      disabled
      classes={{
        disabled: styles.greySquare,
      }}
    >
      {children}
    </Button>
  )
}

export function YellowStatusSquare(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button
      disabled
      classes={{
        disabled: styles.yellowSquare,
      }}
    >
      {children}
    </Button>
  )
}

export function DisabledStatus(props) {
  const styles = statusStyle()
  const { children } = props
  return (
    <Button
      disabled
      classes={{
        disabled: styles.disabled,
      }}
    >
      {children}
    </Button>
  )
}

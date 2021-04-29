import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginTop: '15px',
    marginBottom: '40px',
  }
})
export default function OrderTitle(props) {
  const classes = useStyles()
  const { title } = props
  return (
    <Typography variant='h2' className={classes.root}>
      {title}
    </Typography>
  )
}
import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import loadingIcon from "../../assets/loadingIcon.svg"

const useStyles = makeStyles({
  root: {
    minHeight: '81vh',
  },
})

const LoadingIcon = () => {
  const classes = useStyles()
  return(
    <Box display="flex" justifyContent="center" className={classes.root}>
      <img src={loadingIcon} alt="loading icon" />
    </Box>
  )
}

export default LoadingIcon

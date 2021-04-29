import React from 'react'
import { makeStyles, Grid, Typography, Button }from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '81vh',
  },
  btn: {
    marginTop: '20px'
  }
}))

const NoDataFound = (props) =>{
  const { refreshPage, title } = props
  const classes = useStyles()

  return(
    <Grid className={classes.root}>
      <Typography variant="h3">{title}</Typography>
      <Button 
        className={classes.btn} 
        variant="contained" 
        color="primary" 
        onClick={() => refreshPage()}
      >
        Refresh Page
      </Button>
    </Grid>
  )
}

export default NoDataFound
import React from 'react'
import { Grid,Typography,makeStyles } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import rocket from "../../../assets/rocket.svg"

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    actionAreaimageIcon:{
      width:'100%',
      marginTop:'14vh'
    },
    font2:{
      textAlign:'left',
      lineHeight:'1.6'
    },
    icon:{
      fontSize:'default'
    },
  }))
export default function ComingSoon() {
    const classes = useStyles( )
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={6} sm={4} />
      <Grid item xs={6} sm={4}>
        <Icon>
          <img 
            className={classes.actionAreaimageIcon} 
            src={rocket} 
            alt="rocket"
          />
        </Icon>
      </Grid>
      <Grid item xs={6} sm={4} />
      <Grid item xs={6} sm={3} />
      <Grid item xs={6} sm={6}>
        <Typography variant='h1'>
          COMING SOON
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3} />
    </Grid>
  )
}
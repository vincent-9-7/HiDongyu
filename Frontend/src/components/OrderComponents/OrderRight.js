import React from "react"
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Container } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import KingBedIcon from '@material-ui/icons/KingBed'
import BathtubIcon from '@material-ui/icons/Bathtub'
import RoomIcon from '@material-ui/icons/Room'
import NoteIcon from '@material-ui/icons/Note'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import Divider from '@material-ui/core/Divider'
import Moment from 'react-moment'

const useStyles = makeStyles(() => ({
  icon: {
    color: '#707070',
  },

  hover: {
    padding: 0,
  },

  price: {
    color: '#29b6f6',
  },

  rightTop: {
    marginBottom: '30px',
    marginTop: '30px',
  },

  text: {
    paddingLeft: '10px',
  },

  textbottom: {
    paddingBottom: '30px',
  },

  totalprice: {
    paddingTop: '30px',
  }
}))

export default function OrderRight({data}) {
  const classes = useStyles()


  let {bedroomNum} = data
  let {bathroomNum} = data
  if(bedroomNum !== '') {
    bedroomNum = `Bedrooms x ${bedroomNum}`
  }
  if(bathroomNum !== '') {
    bathroomNum = `Bathrooms x ${bathroomNum}`
  }

  let {address:{address2}} = data
  let {address:{address1}} = data
  let {address:{suburb}} = data
  let {address:{state}} = data
  let {address:{postcode}} = data

  if(address2 !== null && address2 !== ''){
    address2 = `${address2}, `
  }
  if(address1!== null && address1 !== ''){
    address1 = `${address1}, `
  }
  if(suburb!== null && suburb !== ''){
    suburb = `${suburb}, `
  }
  if(postcode!== null && postcode !== ''){
    postcode = `${postcode}, `
  }
  if(state!== null && state !== ''){
    state = `${state}`
  }
  const totalAddress = `${address2}${address1}${suburb}${postcode}${state}`

  let {startTime} = data 
  let timeDisplay = false
  if(startTime !== null && startTime !== '') {
    startTime = startTime.split(':',3)
    startTime = `${startTime[0]}:${startTime[1]}`
  }else {
    timeDisplay = true
  }
  const {price} = data
  let {type} = data
  if(type === 'RC') {
    type = 'Regular Clean'
  }
  else if(type === 'EC') {
    type = 'End lease Clean'
  }
  
  window.onbeforeunload = () => {
    localStorage.removeItem('homeOrderData')
    localStorage.removeItem('regularCleanOrder')
    localStorage.removeItem('endofleaseCleanOrder')
  }

  return (
    <>
      <Box className={classes.rightTop}>
        <Container maxWidth="lg" className={classes.textbottom}>
          <Grid container direction="column">
            <Grid item xs={12} sm={12}>
              <Grid container direction="row">
                <Grid item xs={1} sm={1}>
                  <KingBedIcon fontSize="large" className={classes.icon} />
                </Grid>
                <Grid item xs={11} sm={11}>
                  <Typography variant='h6' className={classes.text}>     
                    {bedroomNum}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container direction="row">
                <Grid item xs={1} sm={1}>
                  <BathtubIcon fontSize="large" className={classes.icon} />
                </Grid>
                <Grid item xs={11} sm={11}>
                  <Typography variant='h6' className={classes.text}>
                    {bathroomNum}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container direction="row">
                <Grid item xs={1} sm={1}>
                  <NoteIcon fontSize="large" className={classes.icon} />
                </Grid>
                <Grid item xs={11} sm={11}>
                  <Typography variant='h6' className={classes.text}>{type}</Typography>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <Grid container direction="row">
                <Grid item xs={1} sm={1}>
                  <CalendarTodayIcon fontSize="large" className={classes.icon} />
                </Grid>
                <Grid item xs={11} sm={11}>
                  <Hidden xsUp={timeDisplay}>
                    <Typography variant='h6' className={classes.text}>
                      <Moment format="dddd HH:mm, DD MMM YYYY">{startTime}</Moment>
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container direction="row">
                <Grid item xs={1} sm={1}>
                  <RoomIcon fontSize="large" className={classes.icon} />
                </Grid>
                <Grid item xs={11} sm={11}>
                  <Typography variant='h6' className={classes.text}>
                    {totalAddress}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            
          </Grid>
        </Container>

        <Divider />

        <Container maxWidth="lg" className={classes.totalprice}>
          <Grid container direction="row" alignItems="flex-end">
            <Grid item xs={6} sm={6}>
              <Typography align="left" variant='h4'>
                Total
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography align="right" variant='h4' className={classes.price}>
                $
                {price}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}


/* eslint-disable max-len */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Paper,Grid,Typography,Box } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import StarRoundedIcon from '@material-ui/icons/StarRounded'

const useStyles = makeStyles((themes) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: themes.spacing(3),
  },
 
  li: {
    [themes.breakpoints.down("xs")]: {
      margin: "auto",
    },
    [themes.breakpoints.up("sm")]: {
      margin: "10%",
    },
  },

  status1:{
    backgroundColor: "#89b153",
    float: "left",
    padding: "2px 25px",
    listStyleType: "none",
    borderRadius: "100px",
    color:"white",
  },
  status2:{

    backgroundColor: "#cc584e",
    float: "left",
    padding: "2px 25px",
    listStyleType: "none",
    borderRadius: "100px",
    color:"white",

  }
}))


function showCardInfo(card, array,index, isAvailable, classes) {
  if (index.valueOf() === 4) {
    return (
      <div className={`title ${isAvailable ? classes.status1 : classes.status2}`}>
        <li key={card.item}>
          <Typography variant="subtitle2">
            { array[index].slice(0,1).toUpperCase()+array[index].slice(1).toLowerCase()}
          </Typography>
        </li>
      </div>
)
  } 
    return (
      <li key={card.item} className={classes.li}>
        <Typography variant="subtitle2">
          { array[index] }
        </Typography>
      </li>
  )
  
}

export default function AutoGrid(props) {

  const classes = useStyles()
  const {UserData }=props
  const {postcode}=UserData.address
  const {email,phone,workingExperience,employmentStatus}=UserData
  const arrayObj =[]
  arrayObj.push([postcode,email,phone,workingExperience,employmentStatus])

  return (
    <Box className={classes.root}>
      <Grid container spacing={5}>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} variant="outlined">

            <Grid item xs container direction="column" spacing={2}>
     
              <Grid item xs>
                <Typography>Total Orders</Typography>                       
              </Grid>

              <Grid item key={UserData.numberOfOrderFinished}>
                <Typography variant="h3">{UserData.numberOfOrderFinished + UserData.numberOfOnGoingOrder}</Typography>            
              </Grid>
   
            </Grid>

          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} variant="outlined">
            <Grid item xs sm container direction="column" spacing={2}>
              <Grid item>
                <Typography>Reviews</Typography>
              </Grid>
              <Grid item container direction="row" spacing={2}>
      
                <Grid item xs key={UserData.averageRating}>
                  <Typography variant="h3">{UserData.averageRating}</Typography>
                </Grid> 

                <Grid item xs>
                  <Box component="fieldset" mb={0.5} borderColor="transparent" key={UserData.averageRating} margin="10% auto">
                    <Rating 
                      name="half-rating-read"
                      defaultValue={UserData.averageRating}
                      precision={0.5}
                      icon={<StarRoundedIcon fontSize="inherit" />}
                      readOnly
                    />
                  </Box>
                </Grid>

              </Grid>            
            </Grid>            
          </Paper>
        </Grid>


        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper} variant="outlined">
            <Grid container spacing={2} justify="space-evenly">
              <Grid item xs={4} sm={3}>
                <ul>
                  <li className={classes.li}>
                    <Typography variant="subtitle2">Postcode</Typography>
                  </li>
                  <li className={classes.li}>
                    <Typography variant="subtitle2">Email</Typography>
                  </li>
                  <li className={classes.li}>
                    <Typography variant="subtitle2">Phone</Typography>
                  </li>
                  <li className={classes.li}>
                    <Typography variant="subtitle2">Experience</Typography> 
                  </li>
                  <li className={classes.li}>
                    <Typography variant="subtitle2">Status</Typography>
                  </li>
                </ul>
              </Grid>
  
              <Grid item xs={8} sm={3}>
                {arrayObj[0].map((item, index) => (
                  <ul key={item}>    
                    { showCardInfo(UserData, arrayObj[0],index, UserData.employmentStatus === "available", classes)}
        
                  </ul>
                ))}
              </Grid>
 
            </Grid>
          </Paper>
        </Grid>


      </Grid>
    </Box>
  )
}

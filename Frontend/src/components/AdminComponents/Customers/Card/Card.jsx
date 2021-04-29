/* eslint-disable max-len */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Paper,Grid,Typography,Box } from '@material-ui/core'

const useStyles = makeStyles((themes) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: themes.spacing(4),
  },

  li: {
    [themes.breakpoints.down("xs")]: {
      margin: "2%",
    },
    [themes.breakpoints.up("sm")]: {
      margin: "10%",
    },
 
  },
}))


export default function AutoGrid(props) {

  const classes = useStyles()
  const {UserData}=props
  const {postcode}=UserData[0].address
  const {email,phone}=UserData[0]
  const arrayObj =[]
  arrayObj.push([postcode,email,phone])

  return (
    <Box className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} variant="outlined">

            <Grid item xs container direction="column" spacing={2}>
     
              <Grid item xs>
                <Typography>Total Orders</Typography>                       
              </Grid>
              {UserData.map((card)=>(
                <Grid item key={card.numberOfOrderFinished}>
                  <Typography variant="h3">{card.numberOfOrderFinished + card.numberOfOnGoingOrder}</Typography>            
                </Grid>
                ))}
             
            </Grid>

          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} variant="outlined">
            <Grid item xs sm container direction="column" spacing={2}>
              <Grid item>
                <Typography>Completed Orders</Typography>
              </Grid>
              {UserData.map((card)=>(
                <Grid item xs key={card.numberOfOrderFinished}>
                  <Typography variant="h3">{card.numberOfOrderFinished}</Typography>
                </Grid> 
              ))}         
            </Grid>            
          </Paper>
        </Grid>


        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper} variant="outlined">
            <Grid container justify="space-evenly">
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
                </ul>
              </Grid>
              {arrayObj.map((card) => (
                <Grid item xs={8} sm={3} key={card}>
                  <ul>
                    {card.map((item) => (
                      <li key={item} className={classes.li}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
          ))}
                  </ul>
                </Grid>
         ))}
            </Grid>
          </Paper>
        </Grid>


      </Grid>
    </Box>
  )
}

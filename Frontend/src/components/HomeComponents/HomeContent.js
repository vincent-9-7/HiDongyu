import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import HomeSelectForm from './components/HomeSelectForm'
import scssStyle from './scss/HomeContent.module.scss'


const useStyles = makeStyles((theme) => ({
  title: {

    [theme.breakpoints.down('sm')]: {
      fontSize: '2.1rem',
      fontWeight: 'bold',
      padding: '0px 10px',
      paddingTop: '15vh',
    },
    [theme.breakpoints.between('sm','md')]: {
      fontSize: '3.4375rem',
      fontWeight: 'bold',
      padding: '0px 30px',
      paddingTop: '20vh',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.4375rem',
      fontWeight: 'bold',
      padding: '0px 30px',
      paddingTop: '40vh',
    }
  },

  subtitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      padding: '0px 8px',
      paddingTop: '1vh',
    },
    [theme.breakpoints.between('sm','md')]: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      padding: '0px 30px',
      paddingTop: '0.5vh',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
      fontWeight: 'bold',
      padding: '0px 30px',
      paddingTop: '1vh',
    }
  }  
}))


const HomeTitle = () => {
  const classes = useStyles()
  return(
    <Box className={scssStyle.background}> 
      <Grid
        container
        spacing={0}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            component="h3" 
            className={classes.title}
          >
            We Clean. You Relax.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            align="center"
            component="h5"
            className={classes.subtitle}
          >
            Get your housekeeping done now!
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <HomeSelectForm />
        </Grid>
        
      </Grid>
    </Box>
  )
}
export default HomeTitle
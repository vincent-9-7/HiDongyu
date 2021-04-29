/* eslint-disable max-len */
import React from 'react'
import { makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import GetAvatar from '../../../Avatar/AvatarLargeSize'

const useStyles = makeStyles((themes) => ({
  root: {
    display: 'flex',

    '& > *': {
      margin: themes.spacing(1),
    },
  },

  img: {
    margin: "auto",
  }
}))

export default function Avatars(props) {
  const classes = useStyles()
  const {UserData}=props

  return (

    <div className={classes.root}>

      <Grid item xs container direction="column" spacing={2}>
        <Grid item className={classes.img}>
          <GetAvatar />
        </Grid>
             
        <Grid item xs>
          <Box textAlign="center" width="100%" fontWeight="bold" fontSize={25}>
            {UserData.name.firstName}
            {' '}
            {UserData.name.lastName}
          </Box>
        </Grid>
    
        <Grid item xs>
          <Box color="white" bgcolor="#cc584e" p={1} borderRadius={15} fontWeight={700} textAlign="center" maxWidth="20vh" margin="auto">
            Staff
          </Box>
          
        </Grid>
      </Grid>
    </div>

  )
}

import React from 'react'
import { Avatar, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.down('sm')]: {
        
    },
    [theme.breakpoints.between('sm','md')]: {
        
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "36px",
      height: theme.spacing(14),
      width: theme.spacing(14),
    }
  },

  name: {
    [theme.breakpoints.down('sm')]: {
      fontSize: "10px",
    },
    [theme.breakpoints.between('sm','md')]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "20px",
    }
  }
}))

export default function UserAvatar(props) {
    const classes = useStyles()
    const { firstName, lastName } = props
    return (
      <>
        <Avatar className={classes.avatar}>
          {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
        </Avatar>
        <Box
          fontWeight="fontWeightBold"
          className={classes.name}
          mt={2}
        >
          {`${firstName} ${lastName}`}
        </Box>


      </>
    )
}
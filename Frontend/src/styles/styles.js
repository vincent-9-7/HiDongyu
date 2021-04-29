import { makeStyles } from '@material-ui/core'

export const navBarStyle = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    marginInline: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      marginInline: 0,
    },
  },
  logoimg: {
    height: '5vh'
  },
  bookingButton: {
    color: 'white',
    background: theme.palette.primary.main,
    borderRadius: '12px', 
    marginInline: '20px',
    paddingLeft: '25px',
    paddingRight: '25px',
    '&:hover': {
      background: theme.palette.primary.hover,
      boxShadow: '0px 2px 10px #888888',
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttonsBox: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}))

export const buttonStyle = makeStyles((theme) => ({
  primaryButton: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    borderRadius: '25px',
    marginInline: '25px',
    '&:hover': {
      background: theme.palette.primary.hover,
      boxShadow: '0px 2px 10px #888888',
    },
  },

  secondaryButton: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
    borderRadius: '25px',
    marginInline: '25px',
    '&:hover': {
      background: theme.palette.secondary.hover,
      boxShadow: '0px 2px 10px #888888',
    },
  },

  bookingButton: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },
    background: theme.palette.primary.main, 
    borderRadius: '12px',
    color: theme.palette.primary.contrastText,
    padding: '8px 60px',
    '&:hover': {
      background: theme.palette.primary.hover, 
      boxShadow: '0px 2px 10px #888',
    },
  },
  previousButton:{
    background: '#29b6f6', 
    borderRadius: '8px',
    padding: '8px 30px',
    margin:'30px 0',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: '#29b6f6',
      boxShadow: '0px 2px 10px #888',
    }
  },
  nextButton:{
    background: '#29b6f6', 
    borderRadius: '8px',
    padding: '8px 30px',
    margin:'30px -15px',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: '#29b6f6', 
      boxShadow: '0px 2px 10px #888',
    },
    [theme.breakpoints.down('sm')]: {
      margin:'30px -10px',
    },
  },
  finalBookingButton:{
    background: '#29b6f6', 
    borderRadius: '8px',
    padding: '8px 30px',
    margin:'30px 0',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: '#29b6f6', 
      boxShadow: '0px 2px 10px #888',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth:'150px',
      padding: '8px 0px',
    },
  }
}))

export const statusStyle = makeStyles((theme) => ({
  green: {
    color: 'white',
    minWidth: '135px',
    background: theme.palette.green.main,
    borderRadius: '20px',
    '&:disabled': {
      color: 'white',
    },

  },
  grey: {
    background: theme.palette.grey.main,
    minWidth: '135px',
    borderRadius: '20px',
    '&:disabled': {
      color: 'white',
    },

  },
  red: {
    background: theme.palette.red.main,
    minWidth: '135px',
    borderRadius: '20px',
    '&:disabled': {
      color: 'white',
    },
  },
  blue: {
    background: theme.palette.blue.main,
    minWidth: '135px',
    borderRadius: '20px',
    '&:disabled': {
      color: 'white',
    },

  },
  yellow: {
    background: theme.palette.yellow.main,
    minWidth: '135px',
    borderRadius: '20px',
    '&:disabled': {
      color: 'white',
    },
  },
  greenSquare: {
    color: 'white',
    background: theme.palette.green.main,
    '&:disabled': {
      color: 'white',
    },
  },
  greySquare: {
    background: theme.palette.grey.main,
    '&:disabled': {
      color: 'white',
    },
  },
  redSquare: {
    background: theme.palette.red.main,
    '&:disabled': {
      color: 'white',
    },
  },
  blueSquare: {
    background: theme.palette.blue.main,
    '&:disabled': {
      color: 'white',
    },
  },
  yellowSquare: {
    background: theme.palette.yellow.main,
    '&:disabled': {
      color: 'white',
    },
  },
  disabled: {
    '&:disabled': {
      color: '#BEC3DC',
    },
  },
}))

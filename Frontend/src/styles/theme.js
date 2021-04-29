import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from "@material-ui/core/styles/createBreakpoints"

const breakpoints = createBreakpoints({})
const theme = createMuiTheme({
  breakpoints,
  typography: {
    fontFamily: 'museo-sans, sans-serif',
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    textTransform: 'none',
    button: {
      textTransform: 'none',
    },
    h3: {
      fontWeight: 700,
      marginBottom: '20px',
      [breakpoints.down('xs')]: {
        fontSize: '2rem',
      }
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    h1: {
      fontWeight: 600,
      fontSize: '3rem',
    },
    subtitle1:{
      fontWeight: 600,
      fontSize: '2rem',
    },
  },

  palette: {
    primary: {
      main: '#007bf5',
      hover: '#107CE6',
    },
    secondary: {
      main: '#F35162',
      hover: '#E55766',
      darkBlue: '#405592', 
      black: '#131523', 
    },
    green: {
      main: '#89B153',
      light: '#E8F0DC',
      hover: '#88AB59',
    },
    red: {
      main: '#C5554B',
    },
    blue: {
      main: '#007BF5',
    },
    yellow: {
      main: '#E77D4A',
    },
    grey: {
      main: '#5F647D',
    },
  },

  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none',
        padding: '8px',
        fontSize: '1rem',
      },
      head: {
        fontWeight: 700,
        fontSize: '1.3rem',
        [breakpoints.down('xs')]: {
          fontSize: '1.1rem',
        },
      }
    }
  },
})

export default theme

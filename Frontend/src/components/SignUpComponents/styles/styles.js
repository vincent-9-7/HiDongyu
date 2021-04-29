import { makeStyles } from "@material-ui/core"

export const navBarStyle = makeStyles((theme) => ({
    AppBar: {
      backgroundColor: theme.palette.primary.white,
    },
    grow:{
      flexGrow:1,
    },
    container: {
      width: 1170,
      margin: "auto",
    },
    bookingButton: {
      color: theme.palette.primary.white,
      background: theme.palette.primary.main, 
      borderRadius: "25px",
      marginInline: "20px",
      "&:hover": {
        background: theme.palette.primary.main,
        boxShadow: "0px 2px 10px #888888",
      },
    },
}))

export const buttonStyle = makeStyles((theme) => ({
  homeBookingButton: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    borderRadius: '30px',
    marginInline: '12px',
    paddingTop:'2.0%',
    paddingBottom:'2.0%',
    width:'100%',
    marginBottom:'15px',
  
      "&:hover": {
        background: theme.palette.primary.dark, 
        boxShadow: "0px 2px 10px #888",
      }
    },
  faceBookButton: {
      background: theme.palette.secondary.darkBlue, 
      borderRadius: '30px',
      marginInline: '25px',
      paddingTop:'2.0%',
      paddingBottom:'2.0%',
      marginTop:'3px',
      marginBottom:'20px',
      color: theme.palette.primary.contrastText,
      
      width:'85%',
  
      
      
     "&:hover": {
        background: theme.palette.primary.dark, 
        boxShadow: "0px 2px 10px #888",
      }
    },

    googleButton: {
      background: theme.palette.primary.contrastText, 
      borderRadius: '30px',
      marginInline: '25px',
      paddingTop:'2.0%',
      paddingBottom:'2.0%',
      width:'85%',
      marginTop:'-5px',
      marginBottom:'8px',
      color: theme.palette.secondary.black,
     
      "&:hover": {
        background: theme.palette.primary.dark, 
        boxShadow: "0px 2px 10px #888",
      }
    }
  

})
)


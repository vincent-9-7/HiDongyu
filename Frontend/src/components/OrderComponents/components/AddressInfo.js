import React from "react"
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '10px',
    marginTop: '10px',
  },

  input: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '100%',
  }

}))

export default function AddressInfo() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="First Name"
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="Last Name"
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="Street Address"
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="Apt # (optional)"
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>
      </Grid>
      
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="Suburb"
            error
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="State"
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            id=""
            label="Phone Number"
            InputLabelProps={{ 
                shrink: true,
              }}
            variant="outlined"
            className={classes.input}
          />
        </Grid>

        <Grid item xs={6} sm={6} />
      </Grid>
      
      
      
    </Box>





  )
}
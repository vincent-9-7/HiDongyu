import React from "react"
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '30px',
    marginTop: '10px',
  },

  input: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '100%',
  }

}))

export default function PaymentInfo({error,CardNumberText,DateText,CVCText}) {
  const classes = useStyles()

  return (
    <Box>
      <Grid container direction="column" spacing={0} className={classes.root}>
        
        <Grid container direction="row" spacing={0}>
          <Grid item xs={12} sm={12}>
            <TextField
              id=""
              label={CardNumberText}
              InputLabelProps={{ 
                shrink: true,
              }}
              variant="outlined"
              className={classes.input}
              error={error}
            />
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id=""
              label="MM/YY"
              variant="outlined"
              helperText={DateText}
              className={classes.input}
              error={error}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id=""
              label="CVC"
              variant="outlined"
              helperText={CVCText}
              className={classes.input}
              error={error}
            />
          </Grid>
        </Grid>
      </Grid>

    </Box>

  )
}
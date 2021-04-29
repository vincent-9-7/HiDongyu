import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import {useForm,Controller } from 'react-hook-form'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import {forgetpassword} from "../../store/actions/actionCreator"
import {ConfirmButton} from './Button'




export default function ForgetPassword() {
    const {control ,handleSubmit} = useForm()
  const dispatch = useDispatch()
    const onSubmit = (data) =>{
      dispatch(forgetpassword(data))
    }

    

    const forgetPassword = useSelector((state) => state.forgetPassword)
    const { userInfo, loading, error } = forgetPassword
    const useStyles = makeStyles((theme) => ({
          [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
          },
          [theme.breakpoints.between('sm','md')]: {
            textAlign: 'center',
          },
          [theme.breakpoints.up('md')]: {
            textAlign: 'center',
          },

          root: {
            minHeight: "100%",
            minWidth: "200%",
          },

          text: {
            fontWeight: 'bold',
            marginLeft: 40,
            marginRight: 50,
            paddingBottom: 20,
            paddingTop: 30,
            width: '120%',
          },

          textField: {
            marginBottom: 45,
            width: '92%',
          },

          response: {
            fontWeight: 'bold',
            paddingBottom: '30px',
          },
        }))
    const classes = useStyles()
  
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
      item
      xs={12}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <Grid container justify="center">
              <Typography
                className={classes.text}
              >
                Enter your Registration Email address 
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Controller
                as={(
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="outlined-basic"
                    label="Email"
                    type="Email"
                    variant="outlined"
                  />
                    )}
                name="email"
                control={control}
                defaultValue=""
              />
                
            </Grid>
            <Grid container justify="center">
              {loading && <CircularProgress />}
              {error && (
              <Typography
                color="error"
                className={classes.response}
                align="center"
              >
                {error}
              </Typography>
            )}
              {userInfo && (
              <Typography
                color="primary"
                className={classes.response}
                align="center"
              >
                Sent successfully! Please check your email
              </Typography>
            )}
        
              <Grid container justify="center">
                <ConfirmButton />
              </Grid>
            </Grid>
          </Card>
        </Grid>   
      </form>
    </Grid>
   
    
  )
}
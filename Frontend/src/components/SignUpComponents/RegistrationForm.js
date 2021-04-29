/* eslint no-unused-vars: "error" */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] *///
import {React} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {useForm,Controller } from 'react-hook-form'
import {useDispatch,useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import {PopupButton} from './Button'
import {register} from "../../store/actions/actionCreator"
import FormDialogLoginPop from './FormDialogLoginPop'



export default function RegistrationForm() {
  const {control ,handleSubmit} = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) =>{
    dispatch(register(data))
  }
  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  

  const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('sm')]: {
      textAlign:'center',
    },
    [theme.breakpoints.between('sm','md')]: {
      textAlign:'center',
    },
    [theme.breakpoints.up('md')]: {
      textAlign:'center',
    },
    title:{
      padding: '0px, 0px, 0px, 25px',
      paddingTop: '1vh',
      fontWeight:'bold',
      fontSize:'30px'
    },
    textField: {
      [`& fieldset`]: {
        borderRadius: '30px',
      },
      width:'92%',
      marginBottom:10,
    },
    text:{
      fontWeight:'bold',
      width:'85%',
      marginLeft:'6%'
    },
    mention:{
      fontWeight: 'bold',
      color: '#007bf5',
      float: 'right',
      fontSize:'12px',
      textDecoration: 'none',
      marginRight:'8%',
      marginBottom:'15px'
    },
    button:{
      width:'100%',
    },
    agreement:{
      fontWeight: 'bold',
      fontSize:'11px',
      marginLeft:'16px',
      width:'100%',
      marginBottom:'5px',
      marginRight:'10%'
    },
    divide:{
      borderBottom: "1px solid black",
      width:'90%',
      marginBottom:10
    },
    account:{
      fontWeight: 'bold',
      fontSize:'11px',
      marginLeft:'16px',
      marginBottom:'-25px'
    },
    login:{
      fontWeight: 'bold',
      color: '#007bf5',
      fontSize:'11px',
      textDecoration: 'none',
      paddingLeft:80
    
    },
    loginColor:{
      textDecoration: 'none',
      color: '#007bf5',
    }
  
  }))

const classes = useStyles()
    return (
      <> 
        <Grid container justify="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle className="Dialog-title">
              <Typography
                className={classes.title}
                align="center"
              >
                Join us
              </Typography>
            </DialogTitle>
            <Grid container justify="center">
              {loading && <CircularProgress />}
              {error && (
              <Typography
                color="error"
                className={classes.text}
              >
                {error}
              </Typography>
              )}
              {userInfo && (
              <Typography
                color="primary"
                className={classes.text}
              >
                Your registration successfully!
              </Typography>
              )}
            </Grid>
            <Typography
              className={classes.text}
            >
              Email
            </Typography>
        
            <Grid container justify="center">
              <Controller
                as={(
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="outlined"
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
           
           
          
            <Typography
              className={classes.text}
            >
              Password
            </Typography>
            <Grid container justify="center">
            
              <Controller
                as={(
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                )}
                name="password"
                control={control}
                defaultValue=""
              />
            </Grid>
         
        
   
            <a href="/forgetpassword">
              <Typography
                className={classes.mention}
              >
                Forgot Password?
              </Typography>
            </a>
 
            <Grid container justify="center" className={classes.button}>
              <PopupButton
                type="submit"
              />
            </Grid>
            
   
           
        
            <Grid container justify="center">
              <Typography
                className={classes.agreement}
              >
                By signing up, I agree to terms & conditions.
              </Typography>
              
            </Grid>
            <Grid container justify="center">
              <Divider className={classes.divide} />
            </Grid>
          
            <Grid container direction="row">
              <Grid container justify="flex-start">
                <Typography className={classes.account}>
                  Do not have an account?
                </Typography>
              </Grid>
              <Grid container className={classes.login} justify="flex-end">
                <FormDialogLoginPop />
              </Grid>
            </Grid>
          </form>
        </Grid>
          
      </>
    )
  }




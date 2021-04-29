import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid} from "@material-ui/core"
import{ Alert} from '@material-ui/lab'
import Typography from "@material-ui/core/Typography"
import Card from "../Card"
import Avatars from "../Avatar"
import {getCUSDETAILRequest} from "../../../../store/actions"

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',

      '& > *': {
        margin: theme.spacing(1),
      },
    },

    card: {
      margin: "5% auto",
    },

    title: {
      fontSize: "2vh",
      fontWeight: "bold",
      margin: "2%",
    }
  }))
  
const Displays=(props)=> {
  const {data}=props
  const classes = useStyles()
  const dispatch=useDispatch()

  const users =useSelector(state => state.cusDetails.cusDetails) 
  const loading = useSelector(state => state.cusDetails.loading)
 


  const dispatchRequested=()=>{
    dispatch(getCUSDETAILRequest(data))
  }
  useEffect(()=>{
   dispatchRequested()
},[])

  return (
    <>
      {users.loading&&<p>Loading...</p>}

      {users.length!==0&&(
        <div className={classes.root}>
          <Grid container direction="column">
            <Grid container item lg spacing={4}>
              <Grid item lg={4} style={{margin: "auto"}}>
                <Avatars UserData={users} />
              </Grid>
              <Grid item lg={8} className={classes.card}>
                <Card UserData={users} /> 
              </Grid> 
            </Grid>
            <Grid container style={{marginLeft: "2vh"}}>
              <Typography variant="h6">Order History</Typography> 
            </Grid>
          </Grid>
         
 
        </div>
    )}
      {users.length===0&&!loading&&(
        (<Alert severity="info">No users available! — check it out!</Alert>)
    )}
    </>  
  
  )
}

export default Displays
import React from "react"
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Checkbox from '@material-ui/core/Checkbox'


import ovenIcon from "../../../assets/oven.svg"
import fridgeIcon from "../../../assets/fridge.svg"
import windowIcon from "../../../assets/window.svg"
import cabinetIcon from "../../../assets/cabinet.svg"


const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '10px',
    marginTop: '10px',
  },

  pickerBackground: {
    background: 'lightgrey',
  },

  picker: {
    margin: '3px', 
  },

  actionArea: {
    padding: '0 12px', 
  },

  imageIcon: {
    width: '100%',
  },

  check: {
    padding: '0px', 
  }

}))

export default function ExtraPicker() {
  const classes = useStyles()

  const [state, setState] = React.useState({
    oven: false,
    fridge: false,
    windows: false,
    cabinet:false
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const areaClickChange = (event) => { 

    const key = event.target.name || event.target.alt
    const newState = !state[key]
    setState({...state,[key]:newState})
  }
  const { oven,fridge, windows,cabinet } = state

  return(
    <Grid container direction="row" spacing={1} className={classes.root}>
      <Grid item xs={6} sm={3}>
        <Card className={classes.pickerBackground}>
          <Card className={classes.picker} elevation={2}>
            <CardActionArea
              className={classes.actionArea} 
              name="oven"
              onClick={areaClickChange}
            >
              <Grid container direction='column' alignItems="flex-end">
                <Grid item xs={6} sm={12}>
                  <Checkbox
                    color="primary"
                    checked={oven}
                    name="oven"
                    onChange={handleChange}
                    className={classes.check}
                  />
                </Grid>

                <Grid item xs={6} sm={12}>
                  <Icon>
                    <img className={classes.imageIcon} src={ovenIcon} alt="oven" />
                  </Icon>
                </Grid>
              </Grid>
            </CardActionArea>
            <Typography variant='h6' align='center'>
              oven
            </Typography>
          </Card>
        </Card>
      </Grid>

      <Grid item xs={6} sm={3}>
        <Card className={classes.pickerBackground}>
          <Card className={classes.picker} elevation={2}>

            <CardActionArea
              className={classes.actionArea} 
              name="fridge"
              onClick={areaClickChange}
            >
              <Grid container direction='column' alignItems="flex-end">
                <Grid item xs={6} sm={12}>
                  <Checkbox
                    color="primary"
                    checked={fridge}
                    name="fridge"
                    onChange={handleChange}
                    className={classes.check}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <Icon>
                    <img className={classes.imageIcon} src={fridgeIcon} alt="fridge" />
                  </Icon>
                </Grid>
              </Grid>
            </CardActionArea>
            <Typography variant='h6' align='center'>
              fridge
            </Typography>
          </Card>
        </Card>
      </Grid>

      <Grid item xs={6} sm={3}>
        <Card className={classes.pickerBackground}>
          <Card className={classes.picker} elevation={2}>

            <CardActionArea
              className={classes.actionArea} 
              name="windows"
              onClick={areaClickChange}
            >
              <Grid container direction='column' alignItems="flex-end">
                <Grid item xs={6} sm={12}>
                  <Checkbox
                    color="primary"
                    checked={windows}
                    name="windows"
                    onChange={handleChange}
                    className={classes.check}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <Icon>
                    <img className={classes.imageIcon} src={windowIcon} alt="windows" />
                  </Icon>
                </Grid>
              </Grid>
            </CardActionArea>
            <Typography variant='h6' align='center'>
              windows
            </Typography>
          </Card>
        </Card>
      </Grid>
      
      <Grid item xs={6} sm={3}>
        <Card className={classes.pickerBackground}>
          <Card className={classes.picker} elevation={2}>

            <CardActionArea
              className={classes.actionArea} 
              name="cabinet"
              onClick={areaClickChange}
            >
              <Grid container direction='column' alignItems="flex-end">
                <Grid item xs={6} sm={12}>
                  <Checkbox
                    color="primary"
                    checked={cabinet}
                    name="cabinet"
                    onChange={handleChange}
                    className={classes.check}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <Icon>
                    <img className={classes.imageIcon} src={cabinetIcon} alt="cabinet" />
                  </Icon>
                </Grid>
              </Grid>
            </CardActionArea>
            <Typography variant='h6' align='center'>
              cabinet
            </Typography>
          </Card>
        </Card>     
      </Grid>
    </Grid>
  )
}


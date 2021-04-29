/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles,  Grid, Typography, Tabs, Tab, useTheme
  ,MuiThemeProvider } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createMuiTheme } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PinDropIcon from '@material-ui/icons/PinDrop'
import scssStyle from './scss/Profile.module.scss'
import ProfileRight from './ProfileRight'
import PaymentHistory from './PaymentHistory'
import boy from "../../assets/boy.svg"
import ComingSoon from "./components/ComingSoon"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    paddingTop:'36px',  
    backgroundColor:'#f3f7fa',
  },
  font:{
    fontSize:'large',
    fontWeight:'600',
    textAlign:'left',
    marginLeft:'15px'
  },
  actionAreaimageIcon:{
    width:'100%'
  },
  actionAreaimageIcon2:{
    marginTop:'20px',
    width:'60%',
    marginLeft:'4vh',
    borderRadius:'50%',
    textAlign:'center'
  },
  font2:{
    textAlign:'left',
    lineHeight:'1.6'
  },
  icon:{
    fontSize:'default'
  },
  nameFont:{
    fontSize:'1.7rem',
    fontWeight:'550',
  },
  nameFont2:{
    fontSize:'1rem',
    fontWeight:'550',
    marginBottom:'16px'
  }

}))
function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    )
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  }
  
export default function AutoGrid() {
  const classes = useStyles( )

  let theme = useTheme(  )
  theme = createMuiTheme({
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: "#4da8ed"
        }
      },
      MuiTab: {
        root: {
          "&:hover": {
            backgroundColor:'#f0f4f7',
          }
        },
        textColorPrimary:{
          "&$selected":{
            backgroundColor:'#fefefe',
            borderRadius:'5%'
          } 
          },
        }
      
    }
  })
  const [value, setValue] = React.useState(0)
  const level = localStorage.getItem('authLevel') 
  const info = JSON.parse(localStorage.getItem(`${level}Info`))
  const {lastName} = info.data
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  function handleChangeIndex(index) {
    setValue(index)
  }
  const mediumViewport = useMediaQuery('(min-width:600px)')
  return (
    <div className={classes.root}>
      <Grid container width='100vh'>
        <Grid item md={2} className={scssStyle.backgroundSide} />
        <Grid item md={2} sm={4} xs={12} className={scssStyle.background3}>
          <Grid
            container
            md={12}
            item
            lg={12}
            justify="center"
            alignItems="center"
            className={scssStyle.background2}
          >
            <Grid>
              <Icon>
                <img 
                  className={classes.actionAreaimageIcon2} 
                  src={boy} 
                  alt="boy"
                />
              </Icon>
            </Grid>
          </Grid>
          <Grid
            container
            md={12}
            item
            justify="center"
            alignItems="center" 
            className={scssStyle.background2}
          >
            <Typography className={classes.nameFont}>
              {lastName}
            </Typography>
          </Grid>
          <Grid
            container
            md={12}
            item
            justify="center"
            alignItems="center" 
            className={scssStyle.background2}
          >
            <Typography className={classes.nameFont2}>
              300.00$
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12} className={scssStyle.background3}>
            <>
              <MuiThemeProvider theme={theme}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  orientation={mediumViewport ? "vertical" : "horizontal"}
                > 
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <InfoOutlinedIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            My Profile
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <ConfirmationNumberOutlinedIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Order History
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <PinDropIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Address
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <EmojiEventsIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Rewards
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <WhatsAppIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Social Networks
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <ContactSupportIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Need help
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <SettingsIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Setting
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  
)}
                  />
                  <Tab label={(
                    <>
                      <Grid container>
                        <Grid item sm={1}>
                          <ExitToAppIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={11}>
                          <Typography className={classes.font}>
                            Sign Out
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  
)}
                  />
                </Tabs>
              </MuiThemeProvider>
            </>
          </Grid>

        </Grid>
        <Grid item md={6} sm={8} xs={12} className={scssStyle.background}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabContainer
              dir={theme.direction}
              className={scssStyle.background}
            >
              <ProfileRight />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <PaymentHistory />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ComingSoon />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ComingSoon />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ComingSoon />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ComingSoon />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ComingSoon />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ComingSoon />
            </TabContainer>
          </SwipeableViews>
        </Grid>
        <Grid item md={2} className={scssStyle.backgroundSide} />
      </Grid>
    </div>
  )
}

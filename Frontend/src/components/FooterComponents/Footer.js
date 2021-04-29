import React from "react"
import { makeStyles, Box, Container, Typography, IconButton, Link } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const useStyles = makeStyles({
  footer: {
    backgroundColor: '#eaeaea',
    width: '100%',
    padding: '20px 0',
  },
  warpper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    border: '3px solid #007bf5',
    padding: '8px',
    '&:hover': {
      boxShadow: '3px 3px 5px #999'
    }
  }
})

function Footer(){
  const classes = useStyles()

  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="lg" className={classes.warpper}>
        <Typography variant="subtitle2" color="inherit">
          Copyright © OzCleaner 2021.
        </Typography>
        <IconButton 
          aria-label="contact us" 
          className={classes.btn} 
          component={Link} 
          href="mailto:admin@ozcleaner.com"
        >
          <MailOutlineIcon />
        </IconButton>
        
      </Container>
    </Box>
  )
}

export default Footer

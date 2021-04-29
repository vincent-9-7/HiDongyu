/* eslint-disable */
import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Box } from "@material-ui/core"
import Table from "../../components/AdminComponents/Customers/Table"
import Display from "../../components/AdminComponents/Customers/Display"
import NavBar from '../../components/NavBarComponents/NavBar'
import Footer from '../../components/FooterComponents/Footer'



function CustomersDetailsPage(match){
    const{id}=match.match.params
    return (
     
      <Box bgcolor="#fafafa">
        <CssBaseline />
        <NavBar />      
        <Container maxWidth="lg">
          <Box bgcolor="white">
            <Display data={id} />         
          </Box>
          <Box>
            <Table data={id} type='user' />
          </Box>        
        </Container> 
        <Footer />
      </Box>
    )
  }
  
  export default CustomersDetailsPage
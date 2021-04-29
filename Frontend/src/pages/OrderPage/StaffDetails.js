/* eslint-disable */
import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Box } from "@material-ui/core"
import Display from "../../components/AdminComponents/Staffs/Display"
import Table from "../../components/AdminComponents/Staffs/Table"
import NavBar from '../../components/NavBarComponents/NavBar'
import Footer from '../../components/FooterComponents/Footer'


function StaffDetailsPage(match){
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
          <Table data={id} type='employee' />
        </Box>        
      </Container>
      <Footer />
    </Box>
  )
}

export default StaffDetailsPage
/* eslint-disable max-len */
import React from "react"
import AdminHeaderNavigation from "../../components/AdminComponents/Dashboard/Navigation"
import AdminTabs from "../../components/AdminComponents/Dashboard/Tabs"
import Footer from '../../components/FooterComponents/Footer'


function AdminIndexPage(){
  
    return (
      <div>
        <AdminHeaderNavigation />
        <AdminTabs />
        <Footer />
      </div>
    )
  }
  
  export default AdminIndexPage
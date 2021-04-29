/* eslint-disable max-len */

import React from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import HeaderNavigation from '../../components/NavBarComponents/NavBar'
import HomeContent from '../../components/HomeComponents/HomeContent'
import HomeFeedback from '../../components/HomeComponents/HomeFeedback'
import HomeHowWeWorks from '../../components/HomeComponents/HomeHowWeWorks'
import Footer from '../../components/FooterComponents/Footer'
import BackToTop from '../../components/BackToTopComponents/BackToTop'
import user2 from '../../assets/user2.jpg' 
import user3 from '../../assets/user3.jpg' 

import works1 from '../../assets/work1.jpg' 
import works2 from '../../assets/work2.jpg' 
import works3 from '../../assets/work3.jpg' 

function Home() {
  const trigger = useScrollTrigger({ disableHysteresis: true })

  return (
    <>
      <HeaderNavigation trigger={trigger} />
      <HomeContent />

      <HomeFeedback
        src={user2}
        title="Easy to use and effective!"
        name="- Sarah"
      />
      <HomeFeedback
        src={user3}
        title="This is a fantastic site!"
        name="- Robin baldwin"
      />
      <HomeHowWeWorks src1={works1} src2={works2} src3={works3} />
      <BackToTop />
      <Footer />
    </>
  )
}

export default Home

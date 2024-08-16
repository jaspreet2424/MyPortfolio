import React, { useEffect } from 'react'
import Navbar from './Navbar'
import IntroductionSection from './IntroductionSection'
import UploadProject from './UploadProject'
import UpdatePassword from './UpdatePassword'
import Footer from "./Footer"
import { useDispatch } from 'react-redux'

function Dashboard() {

  return (
    <>
      <Navbar/>
      <IntroductionSection/>
      <UploadProject/>
      <UpdatePassword/>
      <Footer/>
    </>
  )
}

export default Dashboard

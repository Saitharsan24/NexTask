import React from 'react'
import Navbar from '../components/navbarComponent/navbar'
import '../style/homePageLayout.css'
import { Outlet } from 'react-router-dom'

function homePageLayout() {
  return (
    <div className='home-main'>
      <Navbar />
      <div className='homePageLayout-outlet'>
        <Outlet/>
      </div>
    </div>
  )
}

export default homePageLayout


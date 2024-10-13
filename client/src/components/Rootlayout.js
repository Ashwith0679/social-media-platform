import React from 'react'
import Navigation from '../Navigation'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Rootlayout() {
  return (
    <div>
        <Navigation/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Rootlayout
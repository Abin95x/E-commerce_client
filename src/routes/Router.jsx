import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/ProductDetails/ProductDetails'

import Protect from './Protect'
import Public from './Public'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Public><Signup/></Public>}/>
        <Route path='/login' element={<Public><Login/></Public>} />
        <Route path='/home' element={<Protect><Home/></Protect>} />
        <Route path='/details' element={<Protect><ProductDetails/></Protect>}/>
    </Routes>
  )
}

export default Router
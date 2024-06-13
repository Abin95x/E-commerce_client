import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
    </Routes>
  )
}

export default Router
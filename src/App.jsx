import React from 'react'
import './App.css'
import Router from './routes/Router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Router />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

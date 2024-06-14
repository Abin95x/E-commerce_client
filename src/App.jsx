import React from 'react'
import './App.css'
import Router from './routes/Router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Router />} />
        </Routes>
        <div>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App

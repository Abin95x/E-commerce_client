import React from 'react'
import Header from '../../components/Header/Header'
import Body from '../../components/Body/Body'
import SideBar from '../../components/SideBar/SideBar'


const Home = () => {
  return (
    <div>
      <Header/>
      <div className='flex md:flex-row flex-col'>
        <SideBar/>
        <Body/>
      </div>
    </div>
  )
}

export default Home
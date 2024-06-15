import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import Body from '../../components/Body/Body'
import SideBar from '../../components/SideBar/SideBar'



const Home = () => {
  const [product,setProduct] = useState([])
  return (
    <div>
      <Header/>
      <div className='flex '>
        <SideBar productFn ={setProduct}/>
        <Body products={product}/>
      </div>
    </div>
  )
}

export default Home
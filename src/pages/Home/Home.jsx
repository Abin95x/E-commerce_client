import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import Body from '../../components/Body/Body'
import SideBar from '../../components/SideBar/SideBar'



const Home = () => {
  const [products,setProducts] = useState([])
  const [search,setSearch] = useState('')
  console.log(search);
  return (
    <div>
      <Header search={setSearch}/>
      <div className='flex '>
        <SideBar productFn = {setProducts} search = {search}/>
        <Body products = {products}/>
      </div>
    </div>
  )
}

export default Home
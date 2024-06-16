import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import Body from '../../components/Body/Body'
import SideBar from '../../components/SideBar/SideBar'



const Home = () => {
  const [products,setProducts] = useState([])
  const [search,setSearch] = useState('')
  const [category, setCategory] = useState([]);
  

  return (
    <div>
      <Header search={setSearch}/>
      <div className='flex '>
        <SideBar productFn = {setProducts} search = {search} category = {category} setCategory={setCategory}/>
        <Body products = {products} setCategories={setCategory}/>
      </div>
    </div>
  )
}

export default Home
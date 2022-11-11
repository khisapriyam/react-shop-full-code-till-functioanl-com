
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTag from './components/Admin/AddTag';
import Category from './components/Admin/Category';
import Dash from './components/Admin/Dash';
import Dashboards from './components/Admin/Dashboards';
import ProductAdd from './components/Admin/ProductAdd';
import Products from './components/Admin/Products';
import Tag from './components/Admin/Tag';
import Footers from './components/Footer/Footers';
import Headers from './components/Header/Headers';
import HomePage from './components/Pages/HomePage';
import ProductSingles from './components/Pages/ProductSingles';
import Shop from './components/Pages/Shop';

import './_assets/css/bundle.css'
import './_assets/css/style.css'


function App() {

  //slug generate
  const makeSlug = (data) => {
    let arr = data.split(' ');
    return arr.join('-').toLowerCase();
  }

  //tag state
  const[ tags, setTags ] = useState([])

  //get all cats
  const[cats, setCats] = useState([])

  //all product state
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5050/tags`).then(res => {
      setTags(res.data)
    })

  },[])

  useEffect(() => {
    
    axios.get('http://localhost:5050/categories').then( res => {
      setCats(res.data)
    })
    
  },[])

  useEffect(() => {
    
    axios.get('http://localhost:5050/products').then( res => {
      setProducts(res.data)
    })

  },[])
   
  return (
    <>

      <Headers></Headers>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/shop' element={<Shop products={products} setProducts={setProducts} cats={cats}></Shop>}></Route>
          <Route path='/shop/:slug' element={<ProductSingles></ProductSingles>}></Route>
          <Route path='/admin' element={<Dashboards></Dashboards>}>
            <Route path='/admin/products' element={<Products products={products}></Products>}></Route>
            <Route path='/admin/add-products' element={<ProductAdd tags={tags} cats={cats}></ProductAdd>}></Route>
            <Route path='/admin/dash' element={<Dash></Dash>}></Route>
            <Route path='/admin/category' element={<Category cats={cats} makeSlug={makeSlug}></Category>}></Route>
            <Route path='/admin/tag' element={<Tag tags={tags}></Tag>} makeSlug={makeSlug}></Route>
            <Route path='/admin/add-tag' element={<AddTag></AddTag>} makeSlug={makeSlug}></Route>
          </Route>
        </Routes>
        <Footers></Footers>
    </>
  );
}

export default App;

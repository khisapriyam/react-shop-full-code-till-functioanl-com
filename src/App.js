
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Admin/Dashboard';
import Products from './components/Admin/Products';
import Category from './components/Admin/Category';
import Tags from './components/Admin/Tags';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import ProductSingle from './components/Pages/ProductSingle';
import Shop from './components/Pages/Shop';

import './_assets/css/bundle.css'
import './_assets/css/style.css'
import Dash from './components/Admin/Dash';
import AddTag from './components/Admin/AddTag';
import ProductAdd from './components/Admin/ProductAdd';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {


    //tag state
    const [ tags, setTags] = useState([]);

      //showing all devs in DOM
    const [cats, setCats] = useState([]);

    //state for showing products
    const[products, setProducts] = useState([]);

    //making slug
    const makeSlug = (data) => {
      let arr = data.split(' ');
      return arr.join('-').toLowerCase();

    }

    //showing data in DOM
    useEffect(() => {
      axios.get('http://localhost:5050/tags').then(res => {
        setTags(res.data.reverse())
      })
      axios.get('http://localhost:5050/category').then( res => {
        setCats(res.data)
      })
      axios.get('http://localhost:5050/products').then( res => {
        setProducts(res.data)
      })

    },[tags, cats, products])

  return (
    <>

        <Header/>
          <Routes>
            <Route path="/" element={ <Home />}/>
            <Route path="/shop" element={ <Shop products={ products }/>}/>
            <Route path="/shop/:slug" element={ <ProductSingle />}/>
            <Route path="/admin" element={ <Dashboard />} >
              <Route path="/admin/dash" element={ <Dash/>}/>
              <Route path="/admin/products" element={ <Products products={ products }/>}/>
              <Route path="/admin/add-product" element={ <ProductAdd tags={tags} cats={cats} makeSlug={ makeSlug } />}/>
              <Route path="/admin/category" element={ <Category cats={ cats } makeSlug={ makeSlug }/>}/>
              <Route path="/admin/tag" element={ <Tags tags={tags} makeSlug={ makeSlug } />}/>
              <Route path="/admin/add-tag" element={ <AddTag/>}/>

              
            </Route>
            
          </Routes>
        <Footer/>


    
      
    
    </>
  );
}

export default App;

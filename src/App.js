
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import ProductSingle from './components/Pages/ProductSingle';
import Shop from './components/Pages/Shop';

import './_assets/css/bundle.css'
import './_assets/css/style.css'

function App() {
  return (
    <>

      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/shop" element={ <Shop />}/>
          <Route path="/shop/:name" element={ <ProductSingle/>}/>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      
      
      
     
    </>
  );
}

export default App;

import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import image1 from '../../_assets/images/shop/1.jpg'


const Sidebars = ({ setProducts, cats }) => {

    const [search, setSearch ] = useState('')
    
    useEffect(() => {

        axios.get(`http://localhost:5050/products?q=${ search }`).then(res => {
            
            setProducts(res.data)
        })
    })

    //product search by cat
    const handleCatSearch = (e, id) => {
        e.preventDefault()
        axios.get(`http://localhost:5050/categories/${id}/product`).then(res => {
            
            setProducts(res.data)
        })

    }

  return (
    <>
         <div className="sidebar">
            <div className="widget">
                <h6 className="upper">Search Shop</h6>
                <form>
                <input type="text" placeholder="Search.." className="form-control" value={search} onChange={e => setSearch(e.target.value)}/>
                </form>
            </div>
            <div className="widget">
                <h6 className="upper">Categories</h6>
                {
                    cats.map( data => 
                        <ul className="nav">
                            <li>
                                <a onClick={ (e) => handleCatSearch(e, data.id)} href={ data.id }>{ data.name }</a>
                            </li>
                        </ul>
                    )
                }
                
            </div>
    
            <div className="widget">
                <h6 className="upper">Trending Products</h6>
                <ul className="nav product-list">
                <li>
                    <div className="product-thumbnail">
                    <img src={image1} alt=""/>
                    </div>
                    <div className="product-summary"><a href="#">Premium Suit Blazer</a><span>$199.99</span>
                    </div>
                </li>
                <li>
                    <div className="product-thumbnail">
                    <img src={image1} alt=""/>
                    </div>
                    <div className="product-summary"><a href="#">Premium Suit Blazer</a><span>$199.99</span>
                    </div>
                </li>
                </ul>
            </div>
            <div className="widget">
                <h6 className="upper">Popular Tags</h6>
                <div className="tags clearfix"><a href="#">Hipster</a><a href="#">Fashion</a><a href="#">Shirt</a><a href="#">Modern</a><a href="#">Vintage</a>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebars
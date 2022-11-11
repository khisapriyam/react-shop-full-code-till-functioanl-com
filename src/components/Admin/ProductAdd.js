import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductAdd = ({ cats, tags, makeSlug }) => {


//form data manage
  const [inputs, setInputs] = useState({
    name : '',
    regular_price :'',
    sale_price : '',
    desc : '',
    rating : '',
    categoryId : '',
    tagId : '',
    photo : ''
  })

  const handleProductAdd = (e) => {
    e.preventDefault();
    // let slug = makeSlug(inputs.name)

    axios.post('http://localhost:5050/products', inputs ).then( res => {
        setInputs({
            name : '',
            regular_price :'',
            sale_price : '',
            desc : '',
            rating : '',
            categoryId : '',
            tagId : '',
            photo : '',

        })
    })
  }
  
  return (
    <>
      <h1>Add New Products</h1>
      <hr />
      <Link to="/admin/products" className='btn btn-sm btn-primary' >All Products</Link>
      <hr />
      <Form onSubmit={ handleProductAdd }>
        <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type='text' value={inputs.name} onChange={e => setInputs({...inputs, name : e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Regular Price</Form.Label>
            <Form.Control type='text' value={inputs.regular_price} onChange={e => setInputs({...inputs, regular_price: e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Sale Price</Form.Label>
            <Form.Control type='text' value={inputs.sale_price} onChange={e => setInputs({...inputs, sale_price: e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Short Description</Form.Label>
            <textarea className='form-control' value={inputs.desc} onChange={e => setInputs({...inputs, desc: e.target.value})}></textarea>
        </Form.Group>
        <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control type='text' value={inputs.rating} onChange={e => setInputs({...inputs, rating: e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Categories</Form.Label>
            <select className="form-control" value={inputs.categoryId} onChange={e => setInputs({...inputs, categoryId: e.target.value})}>
                <option value="">--Select</option>
                {
                    cats.map(data => 
                        <option value={data.id}>{data.name}</option>
                    )
                }   
            </select>
        </Form.Group>
        <Form.Group>
            <Form.Label>Tags</Form.Label>
            <select className="form-control" value={inputs.tagId} onChange={e => setInputs({...inputs, tagId: e.target.value})}>
                <option value="">--Select</option>
                {
                    tags.map(data => 
                        <option value={data.id}>{data.name}</option>
                    )
                }   
            </select>
        </Form.Group>
        <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control type='text' value={inputs.photo} onChange={e => setInputs({...inputs, photo: e.target.value})}/>
        </Form.Group >
        <Form.Group className='my-3'>
           <Button type='submit' variant='info' className='btn-sm'>Add Now</Button>
        </Form.Group >
       
      </Form>
    </>
  )
}

export default ProductAdd
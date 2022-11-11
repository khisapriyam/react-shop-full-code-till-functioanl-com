import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AddTag = () => {

    const [tag, setTag] = useState();

    //slug generate

    const makeSlug = (data) => {
        let arr = data.split(' ');
        return arr.join('-').toLowerCase();
    }
    
    const handletagAdd = (e) => {
        e.preventDefault();
        let slug = makeSlug(tag)

        axios.post(`http://localhost:5050/tags`,{

            id : '',
            name : tag,
            slug : slug

        }).then( res => {
            setTag('')
        })

    }
   
  return (
    <>
        <h1>Add new tag</h1>
        <hr />
        <Link to="/admin/tag"className='btn btn-primary btn-sm'>All Tags</Link>
        <hr />
        <Form onSubmit={handletagAdd}>
        <Form.Group my ={3}>
            <Form.Control type='text' value={tag} onChange={ e=> setTag(e.target.value)} placeholder='Tag Name'/>
        </Form.Group>
        <br />
        <Form.Group my ={3}>
            <Button type='submit' variant='success'>Add</Button>
        </Form.Group>
        </Form>

    </>
  )
}

export default AddTag
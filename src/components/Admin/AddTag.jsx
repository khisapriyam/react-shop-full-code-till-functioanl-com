import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AddTag = () => {

  //input value state
  const [ tag, setTag] = useState();

  //making slug
  const makeSlug = (data) => {
    let arr = data.split(' ');
    return arr.join('-').toLowerCase();

  }
 
  //add tag
  const handleAddTag = () => {

    let slug = makeSlug(tag)
    axios.post('http://localhost:5050/tags',{
      id : '',
      name : tag,
      slug : slug

    }).then( res => {
      setTag('')

    }).catch(err => {
      console.log(err);
    })

  }


  
  return (
    <>
        <h1>Add Nue Tag</h1>
        <hr />
        <Link to="/admin/tag" className='btn btn-primary btn-sm'>All Tags</Link>

        <hr />
        <Form onSubmit={ handleAddTag }>
            <Form.Group my={ 3 }>
                <Form.Control type='text' placeholder='Tag Name' value={ tag } onChange = { e => setTag(e.target.value)}/>
            </Form.Group>
            <br />
            <Form.Group my={ 3 }>
                <Button type='submit' variant='success' className='btn-sm'>Add</Button>
            </Form.Group>
        </Form>
    </>
  )
}

export default AddTag
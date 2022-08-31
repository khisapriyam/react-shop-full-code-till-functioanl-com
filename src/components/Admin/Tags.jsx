import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Tags = ({ tags, makeSlug }) => {


  //edit tag state
  const[tag, setTag] = useState({
    name :'',
    id : ''
  });

  const[tagUpdateForm, setTagUpdateForm] = useState(false);



  //to delete tags
  const handleTagDelete = (id) => {
    axios.delete('http://localhost:5050/tags/' + id )
  }
  
  //handle tag edit

  const handleTagEdit = (id) => {
    setTagUpdateForm(true);

    axios.get('http://localhost:5050/tags/' + id ).then( res => {
      setTag({
        name : res.data.name,
        id : res.data.id
      })
    })

  }
  // updating edited data
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let slug = makeSlug(tag.name)

    axios.patch('http://localhost:5050/tags/' + tag.id, {
      name : tag.name,
      slug : slug
    }).then( res => {
      setTagUpdateForm(false);

    })

  }
  


  return (
    <>
      <h1>Tags</h1>
      <hr />
      <Link to="/admin/add-tag" className='btn-sm btn btn-primary'>Add new Tags</Link>
      <hr />

      <Table> 
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
              tags.map((data, index) => 
              <tr>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.slug}</td>
              <td>
                <Button variant="warning" className='btn-sm' onClick={ () => handleTagEdit(data.id)}>Edit</Button>
                <Button variant="danger" className='btn-sm' onClick={ () => handleTagDelete(data.id)}>Delete</Button>
              </td>
            </tr>
              )
            }
          
        </tbody>
      </Table>
      {
        tagUpdateForm && 
       <>
        <h3>Edit Tag Data</h3>
        <hr />
        <Form onSubmit={ handleFormSubmit }>
              <Form.Group my={ 3 }>
                  <Form.Control type='text' placeholder='Tag Name' value={ tag.name } onChange = { e => setTag({...tag, name: e.target.value})}/>
              </Form.Group>
              
              <br />
              <Form.Group my={ 3 }>
                  <Button type='submit' variant='success' className='btn-sm' >Update</Button>
              </Form.Group>
          </Form>
       </>
      }

      

      
    </>
  )
}

export default Tags
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'


const Category = ({ cats, makeSlug }) => {

  
  //add cat form
  const[addForm, setAddForm] = useState(false);

  //cat edit form
  const[editForm, setEditForm] = useState(false)

  //input cat data
  const[cat, setCat] = useState({
    name : '',
    id : ''
  });

  
  //handle add form 
  const handleAddForm = () => {
    setAddForm(true)
    setEditForm(false)
    setCat({
      name : '',
      id : ''
    })
  }
  //handleCatFormSubmit
  const handleCatFormSubmit = (e) => {
    e.preventDefault()

    let slug = makeSlug(cat.name)

    axios.post('http://localhost:5050/categories',{
      id : '',
      name : cat.name,
      slug: slug
    }).then( res => {
      setAddForm(false)
      setCat({
        name : '',
        id : ''
      })
    })  
  }

  //delete cat
  const handleCatDelete = (id) => {
    axios.delete('http://localhost:5050/categories/' + id)
  }
  //edit form
  const handleEditForm = (id) => {
    setEditForm(true)
    setAddForm(false)
    
    axios.get('http://localhost:5050/categories/' + id).then( res =>{
      setCat({
        name : res.data.name,
        id : res.data.id
      })
    })
  }

  //update edit data
  const handleCatUpdate = (e) => {
    e.preventDefault()
    let slug = makeSlug(cat.name)

    axios.patch('http://localhost:5050/categories/'+ cat.id, {
      name : cat.name,
      slug : slug

    }).then(res => {
      setCat({
        name : '',
        id : ''
      })
      setEditForm(false)
    })

  }

  return (
    <>
      <h1>Category</h1>
      <hr />
      <Button className='btn btn-sm' onClick={ handleAddForm }>Add New Category</Button>
      <hr />
          
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cats.map((data, index) => 
            <tr>
              <td>{index + 1}</td>
              <td>{ data.name }</td>
              <td>{ data.slug }</td>
              <td>
                <Button className="btn btn-sm" variant='warning'onClick={() => handleEditForm(data.id)}>Edit</Button>
                <Button className="btn btn-sm" variant='danger' onClick={() => handleCatDelete(data.id)}>Delete</Button>
              </td>
            </tr>
            )
          }
        </tbody>

      </Table>
      {
        addForm &&
        <>
        <h2>Add new category</h2>
          <Form onSubmit={ handleCatFormSubmit }>
          <Form.Group my ={3}>
              <Form.Control type='text'  placeholder='Cat Name' value={cat.name} onChange={ e => setCat({ ...cat, name: e.target.value})}/>
          </Form.Group>
          <br />
          <Form.Group my ={3}>
              <Button type='submit' variant='success' >Update</Button>
          </Form.Group>
          </Form>
        </>
      }

    {
        editForm &&
        <>
        <h2>Edit new category</h2>
          <Form onSubmit={ handleCatUpdate }>
          <Form.Group my ={3}>
              <Form.Control type='text'  placeholder='Cat Name' value={cat.name} onChange={ e => setCat({ ...cat, name: e.target.value})}/>
          </Form.Group>
          <br />
          <Form.Group my ={3}>
              <Button type='submit' variant='success' >Update</Button>
          </Form.Group>
          </Form>
        </>
      }
    </>
  )
}

export default Category
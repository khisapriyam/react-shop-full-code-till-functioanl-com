import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'


const Category = ({ cats, makeSlug }) => {


  //add cat form
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  
  //input cat data
  const [cat, setCat] = useState({
    name : '',
    id : ''

  });

  

  //handle add form
  const handleAddForm = () =>{
    setAddForm(true);
    setEditForm(false)
    setCat({
      name : '',
      id : ''
    })
  }
  //handle form sumbit
  const handleCatFormSubmit = (e) => {
    e.preventDefault();

    let slug = makeSlug(cat.name)

    axios.post('http://localhost:5050/category', {
      id: '',
      name : cat.name,
      slug : slug
    }).then( res => {
      setAddForm(false);
      setCat({
        name : '',
        id : ''
      })
    })

  }
  //delete category
  const handleCatDelete = (id) => {
    axios.delete('http://localhost:5050/category/' + id)

  }
  //edit cat data
  const handleEdit = (id) => {
    setAddForm(false);
    setEditForm(true)
    axios.get('http://localhost:5050/category/' + id).then( res =>{
      setCat({
        name : res.data.name,
        id : res.data.id
      })
    })

  }
  // update cat data
  const handleCatUpdate = (e) => {
    e.preventDefault();
    let slug = makeSlug(cat.name)
    axios.patch('http://localhost:5050/category/' + cat.id, {
      name : cat.name,
      slug : slug
    }).then( res => {
      setCat({
        name : '',
        id : ''
      })
      setEditForm(false);
    })

  }


  return (
    <>
      <h1>Category</h1>
      <hr />
      
      <Button className='btn-sm' onClick={handleAddForm}>Add new Category </Button>
      <hr />


      <Table > 
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
            cats.map((data, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.slug}</td>
              <td>
                
                <Button variant="warning" className='btn-sm' onClick={ () => handleEdit(data.id)}>Edit</Button>
                <Button variant="danger" className='btn-sm' onClick={ () => handleCatDelete(data.id)}>Delete</Button>
              </td>
            </tr>
            )
          }

        
        </tbody>
      </Table>
      <>
        
        {
          addForm &&
          <>
           <h2>Add new caterory</h2>
            <Form onSubmit={ handleCatFormSubmit }>
                <Form.Group my={ 3 }>
                    <Form.Control type='text' placeholder='Cat Name' value={cat.name} onChange={ e => setCat({...cat, name:e.target.value})}/>
                </Form.Group>
                
                <br />
                <Form.Group my={ 3 }>
                    <Button type='submit' variant='success' className='btn-sm' >Add</Button>
                </Form.Group>
            </Form>
          </>
        }
        
       </>

       <>
      
        
        {
          editForm &&
          
          <>
          <h2>Edit Category</h2>
            <Form onSubmit={ handleCatUpdate }>
                <Form.Group my={ 3 }>
                    <Form.Control type='text' placeholder='Cat Name' value={cat.name} onChange={ e => setCat({...cat, name:e.target.value})}/>
                </Form.Group>
                
                <br />
                <Form.Group my={ 3 }>
                    <Button type='submit' variant='success' className='btn-sm' >Add</Button>
                </Form.Group>
            </Form>
          </>
        }
        
       </>
    </>
  )
}

export default Category
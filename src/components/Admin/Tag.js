import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Tag = ({ tags, makeSlug }) => {

  //edit tag state
  const [ tag, setTag] = useState({
    name : '',
    id  : ''
  })

  const [tagUpdateForm, setTagUpdateForm] = useState(false)


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5050/tags/${id}`)
  }

  const handleTagEdit = (id) => {
    setTagUpdateForm(true);
    axios.get(`http://localhost:5050/tags/${id}`).then( res => {
      setTag({
        name : res.data.name,
        id : res.data.id
      })
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    let slug = makeSlug(tag.name)

    axios.put('http://localhost:5050/tags/' + tag.id, {
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
      <Link to="/admin/add-tag" className='btn btn-sm btn-primary'>Add New Tag</Link>
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
            tags.map((data, index) => 
            <tr>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.slug}</td>
              <td>
                <Button className="btn btn-sm" variant='warning'onClick={() => handleTagEdit(data.id)}>Edit</Button>
                <Button className="btn btn-sm" variant='danger' onClick={() => handleDelete(data.id)}>Delete</Button>
              </td>
            </tr>
            )
          }
        </tbody>
      </Table>
      
      {
        tagUpdateForm && 
        <>
        <hr />
        <h3>Edit tag data</h3>
          <Form onSubmit={handleFormSubmit}>
          <Form.Group my ={3}>
              <Form.Control type='text' value={tag.name} onChange={ e=> setTag({ ...tag, name : e.target.value})} placeholder='Tag Name'/>
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

export default Tag
import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Products = ({products}) => {

  return (
    <>
      <h1>Products</h1>
      <hr />
      <Link to='/admin/add-products' className='btn btn-sm btn-primary'>Add New Products</Link>
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
            products.map((data, index) => 
            <tr>
              <td>{index+1}</td>
              <td>{data.name}</td>
              <td>{data.slug}</td>
              <td>
                <Button className="btn btn-sm" variant='info'>View</Button>
                <Button className="btn btn-sm" variant='warning'>Edit</Button>
                <Button className="btn btn-sm" variant='danger'>Delete</Button>
              </td>
            </tr>
            )
          }
          
        </tbody>

      </Table>
    </>
  )
}

export default Products
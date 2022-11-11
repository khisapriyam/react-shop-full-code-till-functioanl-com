import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import './Admins.css'

const Dashboards = () => {
  return (
    <section className='dash my-5'>
      <Container>
        <Row>
          <Col md={3}>
            <ul className='list-group dash-menu'>
              <li className='list-group-item'><Link to="/admin/dash">Dashboard</Link></li>
              <li className='list-group-item'><Link to="/admin/products">Products</Link></li>
              <li className='list-group-item'><Link to="/admin/category">Category</Link></li>
              <li className='list-group-item'><Link to="/admin/tag">Tags</Link></li>
              <li className='list-group-item'><a href="#">Logout</a></li>
            </ul>
          </Col>
          <Col md={9}>
            <Outlet></Outlet>
          </Col>
        </Row>
      </Container>

    </section>
  )
}

export default Dashboards
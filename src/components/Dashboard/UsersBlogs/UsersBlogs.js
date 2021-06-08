 import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
 
 const UsersBlogs = () => {
     return (
        <Row>
            <Col xs lg="2">
                <Sidebar />
            </Col>
            <Col xs lg="5">
               <h1>All users</h1>
            </Col>
            <Col xs lg="5">
                <h2>All blogs</h2>
              
            </Col>
        </Row>
     );
 };
 
 export default UsersBlogs;
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SERVER_API } from '../../Login/api';
import Sidebar from '../Sidebar/Sidebar';

const UsersBlogs = () => {
    const [spinner, setSpinner] = useState(false)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch(`${SERVER_API}/allBlogs`)
            .then(res => res.json())
            .then(blog => {
                setBlogs(blog)
                setSpinner(blog)
            })
    }, [])

    const blogDeleteBtn = () => {
        alert('Delete Button Not Implement')
    }


    return (
        <Row>
            <Col xs lg="2">
                <Sidebar />
            </Col>

            {
                (sessionStorage.getItem('isAdmin') === 'true') && <Col>

                    <Col xs lg="4">
                        <h1>All users</h1>
                        <h2>Comming soon...</h2>
                    </Col>
                    <Col xs lg="6">
                        <h2>All blogs</h2>
                        {
                            spinner ? <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Blog Title</th>
                                        <th scope="col">Writer Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    blogs.map(blog =>
                                        <tbody key={blog._id}>
                                            <tr>
                                                <th scope="row">{blog.blogTitle}</th>
                                                <td>{blog.blogerEmail}</td>
                                                <td>{blog.blogerName}</td>
                                                <td><button onClick={blogDeleteBtn} className="btn btn-danger">DELETE</button></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            </table>
                                :
                                <div className="d-flex align-items-center">
                                    <strong>Loading...</strong>
                                    <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                                </div>
                        }
                    </Col>

                </Col>
            }



        </Row>
    );
};

export default UsersBlogs;
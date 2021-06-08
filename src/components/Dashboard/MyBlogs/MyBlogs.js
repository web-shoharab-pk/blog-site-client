import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';
import { SERVER_API } from '../../Login/api';
import Sidebar from '../Sidebar/Sidebar';

const MyBlogs = () => {
    const { user } = useContext(UserContext)
    const [myBlogs, setMyBlogs] = useState([])
    const [spinner, setSpinner] = useState(false)
  

    useEffect(() => {
        fetch(`${SERVER_API}/myBlogs?email=` + user.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('JWTtoken')}`
            }
        })
            .then(res => res.json())
            .then(blogs => {
                setMyBlogs(blogs);
                setSpinner(blogs)
            })

    }, [user.email])

    const blogDeleteBtn = () => {
        alert('Delete Button Not Implement')
    }


    return (
        <Row>
            <Col xs lg="2">
                <Sidebar />
            </Col>
            <Col className="p-5 text-center" xs lg="10">
                {
                    spinner ? <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Blog Id</th>
                                <th scope="col">Blog Title</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {
                            myBlogs?.map(blog =>
                                <tbody key={blog._id}>
                                    <tr>
                                        <th scope="row">{blog._id}</th>
                                        <td>{blog.blogTitle}</td>
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
        </Row>
    );
};

export default MyBlogs;
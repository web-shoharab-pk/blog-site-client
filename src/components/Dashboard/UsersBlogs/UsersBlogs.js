import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SERVER_API } from '../../Login/api';
import Sidebar from '../Sidebar/Sidebar';

const UsersBlogs = () => {
    const [spinner, setSpinner] = useState(false)
    const [blogs, setBlogs] = useState([])
console.log(blogs);
    useEffect(() => {
        fetch(`${SERVER_API}/allBlogs`)
            .then(res => res.json())
            .then(blog => {
                setBlogs(blog)
                setSpinner(blog)
            })
    }, [])

    const blogDeleteBtn = (id) => {
        
        console.log(id);
        fetch(`https://limitless-thicket-85312.herokuapp.com/blogsDeletByID/${id}`, {
            method: 'DELETE'
        })
      alert('Blog deleted Please reload you page!')       
    }


    return (
        <Row>
            <Col xs lg="2">
                <Sidebar />
            </Col>

            {
                // (sessionStorage.getItem('isAdmin') === 'true') && <Col>
              <Col>

                    {/* <Col xs lg="4">
                        <h1>All users</h1>
                        <h2>Comming soon...</h2>
                    </Col> */}
                    <Col xs>
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
                                    blogs?.map(blog =>
                                        <tbody key={blog._id}>
                                            <tr>
                                                <th scope="row">{blog.blogTitle}</th>
                                                <td>{blog.blogerEmail}</td>
                                                <td>{blog.blogerName}</td>
                                                <td><button onClick={(e) => blogDeleteBtn(blog._id)} className="btn btn-danger">DELETE</button></td>
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
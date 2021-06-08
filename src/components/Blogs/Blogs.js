import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Blog from '../Blog/Blog';

const Blogs = () => {
    const [spinner, setSpinner] = useState(false)
    const [blogs, setBlogs] = useState([])
    console.log(blogs);
    useEffect(() => {
        fetch('http://localhost:5500/allBlogs')
            .then(res => res.json())
            .then(blog => {
                setBlogs(blog)
                setSpinner(blog)
            })
    }, [])

    return (
        <main>
            {
                 spinner ? <Row className="mt-5" xs={1} md={4} >          
                 {
                     blogs.map(blog => <Blog key={blog._id} blog={blog} />)
                 }
     </Row>
                 : <div className="d-flex align-items-center">
                            <strong>Loading...</strong>
                            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                        </div>
            }
           
        </main>
    );
};

export default Blogs;
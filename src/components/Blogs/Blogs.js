import React from 'react';
import { Row } from 'react-bootstrap';
import Blog from '../Blog/Blog';

const Blogs = () => {
    return (

        <Row  className="mt-5" xs={1} md={4} >
            {
                [...new Array(20)].map(blog => <Blog blog={blog} />)
            }
        </Row>
    );
};

export default Blogs;
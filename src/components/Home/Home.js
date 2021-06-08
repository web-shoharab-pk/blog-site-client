import React from 'react';
import { Container } from 'react-bootstrap';
import Blogs from '../Blogs/Blogs';
import Navbar from './Navbar/Navbar'; 

const Home = () => {
    return (
        <main>
            <Navbar />
 
            <Container>
                <h1>OUR ALL BLOGS...</h1>
            <Blogs />
            </Container>
            
        </main>
    );
};

export default Home;
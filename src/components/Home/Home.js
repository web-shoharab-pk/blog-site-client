import React from 'react';
import { Container } from 'react-bootstrap';
import Blogs from '../Blogs/Blogs';
import Navbar from './Navbar/Navbar'; 

const Home = () => {
    return (
        <main>
            <Navbar />
 
            <Container>
            <Blogs />
            </Container>
            
        </main>
    );
};

export default Home;
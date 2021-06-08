import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import { ImageBBAPI, SERVER_API } from '../../Login/api';
import Sidebar from '../Sidebar/Sidebar';
const axios = require('axios').default;


const AddBlog = () => {
    const { user } = useContext(UserContext);
    const [confirm, setConfirm] = useState(false) 
    const [imageURL, setImageURL] = useState()
    const { register, formState: { errors }, handleSubmit } = useForm();
  

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', ImageBBAPI)
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData
        )
            .then(function (response) {
                setImageURL(response.data.data.display_url); 
            })
            .catch(function (error) { 
            });
    }

    const onSubmit = data => {
        const allData = {
            ...data, imageURL,  blogerEmail: user.email, blogerName: user.displayName
        } 
        fetch(`${SERVER_API}addBlog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allData)
        })
            .then((result) => {
                setConfirm(result);
            })
    };

    return (
        <Row>
            <Col xs lg="2">
                <Sidebar />
            </Col>
            <Col className="p-3" xs lg="10">
                {
                    confirm ? <h3 className="text-success">Blog Added Done!</h3> : <h4>Add a Blog!</h4>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">Blog Title *</label>
                    <input className="writerInput" placeholder="Content writer name" {...register("blogTitle", { required: true })} />
                    {errors.blogTitle?.type === 'required' && "Name is required"} <br />
                    <label htmlFor="">Blog Image *</label>
                    <input onChange={handleImageUpload} type="file" className="writerInput"  required  />
                    {errors.image?.type === 'required' && "Image is required"} <br />
                    <label htmlFor="">Blog Details *</label>
                    <textarea style={{height: '300px'}} className="writerInput" type="email" placeholder="Content writer email" {...register("blogDetails", { required: true })} />
                    {errors.blogDetails && "Blog Details is required"}
                    <br />
                    <input className="submitBtn" type="submit" />
                </form>
            </Col>
        </Row>
    );
};

export default AddBlog;
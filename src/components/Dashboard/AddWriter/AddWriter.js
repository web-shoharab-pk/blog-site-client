import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { SERVER_API } from '../../Login/api';
import Sidebar from '../Sidebar/Sidebar';
import './AddWriter.css'

const AddWriter = () => {
    const [confirm, setConfirm] = useState(false) 
 
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
 
        fetch(`${SERVER_API}/addBlogsWriter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }, [])
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
                    confirm  ? <h3 className="text-success">Content Writer Added Done</h3> : <h4>Add a Content Writer!</h4>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">Name *</label>
                    <input className="writerInput" placeholder="Content writer name" {...register("name", { required: true })} />
                    {errors.name?.type === 'required' && "Name is required"} <br />
                    <label htmlFor="">Email *</label>
                    <input className="writerInput" type="email" placeholder="Content writer email" {...register("email", { required: true })} />
                    {errors.email && "email is required"}
                    <br />
                    <input className="submitBtn" type="submit" />
                </form>
            </Col>
        </Row>
    );
};

export default AddWriter;
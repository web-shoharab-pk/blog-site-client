import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Sidebar from '../Sidebar/Sidebar';

const AddAdmin = () => {

    const [confirm, setConfirm] = useState(false)
    console.log(confirm);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {

        console.log(data)
        fetch('http://localhost:5500/addanAdmin', {
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
                    confirm ? <h3 className="text-success">Admin Added Done</h3> : <h4>Add an Admin!</h4>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">Name *</label>
                    <input className="writerInput" placeholder="Admin name" {...register("name", { required: true })} />
                    {errors.name?.type === 'required' && "Name is required"} <br />
                    <label htmlFor="">Email *</label>
                    <input className="writerInput" type="email" placeholder="Admin email" {...register("email", { required: true })} />
                    {errors.email && "email is required"}
                    <br />
                    <input className="submitBtn" type="submit" />
                </form>
            </Col>
        </Row>
    );
};

export default AddAdmin;
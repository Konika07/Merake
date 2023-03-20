import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePost.css'

export default function EditPost(post, ...props) {
    const location = useLocation();
    const navigate = useNavigate()
    const id = location.state.id;
    const initialValues = {
        title: location.state.title,
        postText: location.state.postText,
        username: location.state.username
    }

    const onSubmit = (data) => {
        axios.put(`http://localhost:3001/post/${id}`, data).then(res => {
            console.log(data);
            alert("Successfully updated");
            navigate("/home")
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3, "Characters allowed are 3 or more than 3").max(10, "Characters allowed are 10 or less than 10").required()
    })
    
  return (
    <div className='create-post-container'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='form-container'>
                <label>Title: </label>
                <ErrorMessage component='span' name="title"></ErrorMessage>
                <Field id="inputCreatePost" name="title" />
                <br />
                <label>Body: </label>
                <ErrorMessage component='span' name="postText"></ErrorMessage>
                <Field id="inputCreatePost" name="postText" />
                <br />
                <label>Username: </label>
                <ErrorMessage component='span' name="username"></ErrorMessage>
                <Field id="inputCreatePost" name="username" />
                <br />
                <button type='submit'>Update</button>
            </Form>
        </Formik>
    </div>
  )
}

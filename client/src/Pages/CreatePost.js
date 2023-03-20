import './CreatePost.css'
import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validationSchema from '../Component/ValidationSchema';

export default function CreatePost(props) {
    const navigate = useNavigate()
    const initialValues = {
        title: '',
        postText: ''
    }

    const onSubmit = (data) => {
        console.log("here")
        axios.post("http://localhost:3001/post/", data, {
            headers: {
                'accessToken': sessionStorage.getItem("accessToken")
            }
        }).then(res => {
            console.log(res)
            if(res.data.error != null){
                alert(res.data.error)
            } else {
                alert("Successfully created");
                navigate("/home")
            }
        })
    }

  return (
    <div className='create-post-container'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className='form-container'>
                <label>Title: </label>
                <ErrorMessage component='span' name="title"></ErrorMessage>
                <Field id="inputCreatePost" name="title" />
                <br />
                <label>Body: </label>
                <ErrorMessage component='span' name="postText"></ErrorMessage>
                <Field id="inputCreatePost" name="postText" />
                <br />         
                <br />
                <button type="submit">Create</button>
            </Form>
        </Formik>
    </div>
  )
}

import axios from 'axios';
import { Field, Formik , Form, ErrorMessage} from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Registration() {

    const navigate = useNavigate()

    const initialValues = {
        username: "",
        fullName: "",
        emailId: "",
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(5).max(15).required(),
        fullName: Yup.string().required(),
        emailId: Yup.string().email().required(),
        password: Yup.string().min(5).max(30).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password must match").required()
    })

    const onSubmit= (data) => {
        axios.post("http://localhost:3001/auth/", data).then(data => {
            console.log(navigate)
            navigate('/')
        }).catch(
            err => {
                console.log(err.response.data.message)
                alert(err.response.data.message)
            }
        )
    }
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Registration</h1>
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form>
                    <label> Username: </label>
                    <Field name="username"></Field>
                    <ErrorMessage component='span' name="username"></ErrorMessage>
                    <br/>
                    <label>Full Name: </label>
                    <Field name="fullName"></Field>
                    <ErrorMessage component='span' name="fullName"></ErrorMessage>
                    <br/>
                    <label>Email ID: </label>
                    <Field name="emailId"></Field>
                    <ErrorMessage component='span' name="emailId"></ErrorMessage>
                    <br/>
                    <label>PassWord: </label>
                    <Field type= "password" name="password"></Field>
                    <ErrorMessage component='span' name="password"></ErrorMessage>
                    <br/>
                    <label>Confirm password: </label>
                    <Field type = "password" name="confirmPassword"></Field>
                    <ErrorMessage component='span' name="confirmPassword"></ErrorMessage>
                    <br/>
                    <button type = "submit"> Sign Up</button>
                    {/* <ErrorMessage></ErrorMessage>s */}
                </Form>
            </Formik>
        </div>
    </div>
  )
}

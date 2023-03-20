import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login, loggedUser } from '../Reducers/UserSlice';


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit =() => {
        axios.post('http://localhost:3001/auth/login', {username: username, password: password}).then((data) => {
            localStorage.setItem("accessToken", data.data.message)
            dispatch(login(true));
            navigate('/home');
            dispatch(loggedUser(username))
        }).catch(err => {
          alert(err.response.data.error)
        })
    }
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Login</h1>
        <div>
            <label>Username : </label>
            <input type="text" onChange={(event) => setUsername(event.target.value)}></input>
            <br />
            <br />
            <label>Password : </label>
            <input type="password" onChange={(event) => setPassword(event.target.value)}></input>
            <br />
            <br />
            <button onClick={onSubmit}>Login</button>
            <br />
            <br />
            <button onClick={() => {navigate('/sign-up')}}>Sign In</button>
        </div>
    </div>
  )
}

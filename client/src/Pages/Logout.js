import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { login } from '../Reducers/UserSlice';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.clear();
        dispatch(login(false))
        navigate('/');
    })
    
  return (
    <div>
        <h1>Logged Out</h1>
    </div>
  )
}

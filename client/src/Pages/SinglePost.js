import './SinglePost.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Card from '../PostCard/Card';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';

export default function SinglePost() {
    
    const navigate = useNavigate()
    const {id} = useParams();
    const [post, setPost] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/post/${id}`).then(
            (data) => {
                setPost(data.data)
            }
        )
    }, []) 

  return (
        <div className='postPage'>
            <div className='leftSide'>
            <button onClick = {() => {
                navigate(`/post/edit/${id}`, {
                    state: post
                });
                }} >Edit Post</button>
            <Card details={post} disabled="true"></Card>
            </div>
            <div className='rightSide'>
                <Comments postId={id}></Comments>
            </div>
        </div>
  )
}
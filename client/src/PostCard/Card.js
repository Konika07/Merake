import "./Card.css"
import React from 'react'
import {useNavigate} from 'react-router-dom'


export default function Card(post, ...props) {
    const navigate = useNavigate()
    const singlePage = () => {
      navigate(`/post/${post.details.id}`)
    }

  return (
    <div className='post' onClick={singlePage} disabled={true}>
        <div className='title'>{post.details.title}</div>
        <div className='body'>{post.details.postText}</div>
        <div className='footer'>{post.details.username}</div>
    </div>
  )
}

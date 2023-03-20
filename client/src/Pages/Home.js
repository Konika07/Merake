import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../PostCard/Card';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/post").then((response) => {
            setPostList(response.data);
        })
    }, [])

  return (
    <div>
      <div>
        <button onClick={() => {navigate('/createpost')}}> Create a Post </button>
      </div>
      <div>
      {
        postList.map((value, key) => {return(<Card details={value} key={key}></Card>)})
      }
      </div>
    </div>
  )
  
}

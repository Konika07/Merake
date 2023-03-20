import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Comments(postId) {

    const [addNewComment, setAddNewComment] = useState("")
    const [addUserName, setAddUserName] = useState("")
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/comments/${postId.postId}`).then((data)=>{
            setComments(data.data)
        })
    }, [])

    const postComment = () => {
        axios.post('http://localhost:3001/comments/', {messageBody: addNewComment, PostId : postId.postId}, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(
            (data) => {
                if(data.data.error != null){
                    alert(data.data.error)
                    setAddNewComment("")
                    setAddUserName("")
                } else {
                const newComment = {messageBody: addNewComment, userName: addUserName}
                setComments([...comments, newComment])
                setAddNewComment("")
                setAddUserName(data.data.userName)
                }
            }
        )
    }

  return (
    <div>
        <h1 style={{textAlign: 'center'}}>Comments</h1>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </tbody>
            {
                comments.map((comment, key) => {
                    return(
                        <tbody>
                            <tr>
                                <td style={{fontWeight: 'bold'}}>{comment.userName}</td>
                                <td>{comment.messageBody}</td>
                            </tr>
                        </tbody>
                    )
                })
            }
        </table>
            <input type="text" className='addComment' placeholder='Comment here' value={addNewComment} onChange={(event) => setAddNewComment(event.target.value)}></input>
        <button onClick={postComment}>Add</button>
    </div>
  )
}
import React,{ useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { POSTS_DETAILS_ENDPOINT } from '../helpers/endpoints'
import axios from 'axios'


export default function PostDetails() {
    const {id}=useParams()
    const [post, setPost] = useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get(`${POSTS_DETAILS_ENDPOINT}/${id}`)
            .then(response=>{
              console.log(response.data)
              setPost(response.data)
             
    
            }).catch(err=>{
                navigate("/")
             
            })
    
      },[])

  return (
    <div>PostDetails</div>
  )
}

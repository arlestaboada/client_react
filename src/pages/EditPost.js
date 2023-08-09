import React,{ useState,  useEffect} from 'react'
import { Container,Row,Col,Card, Alert } from 'react-bootstrap'
import validator from 'validator'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux'

import { isObjEmpty } from '../helpers/helpers'
import NewPostForm from '../components/forms/NewPostForm'
import { exposures } from '../helpers/exposures'
import { UPDATE_POST_ENDPOINT,POSTS_DETAILS_ENDPOINT } 
from '../helpers/endpoints'
import { getUserPosts } from '../actions/postActions'


export default function EditPost() {

  const {id}=useParams()
  const [errors, setErrors] = useState({})
  const [post, setPost] = useState(null)

  const history= useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    axios.get(`${POSTS_DETAILS_ENDPOINT}/${id}`)
        .then(response=>{

          setPost(response.data)

        }).catch(err=>{
            history("/")
         
        })
       
  },[])

  const editPost =async({title,content,
    exposureId,expirationTime})=>{

    const errors={}
    setErrors(errors)

    if(validator.isEmpty(title)){
      errors.title="El titulo es obligatorio."

    }

    if(validator.isEmpty(content)){
      errors.content="El contenido es obligatorio."

    }

    if(!isObjEmpty(errors)){
     
      setErrors(errors)
      return

    }
    expirationTime=exposureId==
    exposures.PRIVATE?0:expirationTime

    try {
      const response= await axios.put(
                     `${UPDATE_POST_ENDPOINT}/${post.postId}`,
                     {title,content,
                      exposureId,expirationTime
                    })
      await dispatch(getUserPosts())
      toast.info("El post se ha modificado",{
             position:toast.POSITION.BOTTOM_CENTER,
             autoClose:2000
            })
      history(`/post/${response.data.postId}`)
      
    } catch (error) {

      setErrors({editpost:error.response.data.message})
      
    }
 
  }
 
  return (
   <Container className='mt-5 mb-5' >
      <Row>
        <Col sm="12"  lg={{span:10,offset:1}}>
          <Card body>
            {errors.editpost && 
              <Alert variant="danger">
                {errors.auth}
              </Alert>}
            <h3>Editar Post</h3>
            <hr/>
            {post &&  <NewPostForm 
                    errors={errors} 
                    onSubmitCallback={editPost}
                    pTitle={post.title}
                    pContent={post.content}
                    pExposureId={post.exposure.id}
                    textButton={"Editar post"}
                   ></NewPostForm>}
            
          </Card>
        </Col>
      </Row>
   </Container>
  )
}

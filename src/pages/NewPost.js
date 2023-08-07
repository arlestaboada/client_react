import React,{ useState} from 'react'
import { Container,Row,Col,Card, Alert } from 'react-bootstrap'
import validator from 'validator'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

import { isObjEmpty } from '../helpers/helpers'
import NewPostForm from '../components/forms/NewPostForm'
import { exposures } from '../helpers/exposures'
import { CREATE_POST_ENDPOINT } from '../helpers/endpoints'


export default function NewPost() {

  const [errors, setErrors] = useState({})
  const history= useNavigate()

  const login =({title,content,
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
    expirationTime=exposureId==exposures.PRIVATE?0:expirationTime
    axios.post(CREATE_POST_ENDPOINT,{title,content,
      exposureId,expirationTime})
      .then(response=>{
     
        history(`/post/${response.data.postId}`)
     

      })
      .catch(error=>{
        setErrors({newpost:error.response.data.message})
       

      })
 
  }
 
  return (
   <Container className='mt-5 mb-5' >
      <Row>
        <Col sm="12"  lg={{span:10,offset:1}}>
          <Card body>
            {errors.newpost && <Alert variant="danger">{errors.auth}</Alert>}
            <h3>Crear Post</h3>
            <hr/>
            <NewPostForm errors={errors} onSubmitCallback={login}></NewPostForm>
            

          </Card>
        
        </Col>
      </Row>
   </Container>
  )
}

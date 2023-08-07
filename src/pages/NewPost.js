import React,{ useState} from 'react'
import { Container,Row,Col,Card, Alert } from 'react-bootstrap'
import { useDispatch} from 'react-redux'
import validator from 'validator'


import { isObjEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'

import NewPostForm from '../components/forms/NewPostForm'

export default function NewPost() {

  const [errors, setErrors] = useState({})

  const dispatch=useDispatch()



  const login =({email,password})=>{
    const errors={}
    setErrors(errors)
    if(!validator.isEmail(email)){
      errors.email="El correo electrónico es inválido."

    }
    if(validator.isEmpty(password)){
      errors.password="La contraseña no puede estar vacia."

    }

    if(!isObjEmpty(errors)){
     
      setErrors(errors)
      return

    }
    dispatch(loginUser(
      {email,
       password 
      }))
      .then(response=>{

    }).catch(err=>{
        setErrors({auth:"No se puede inciar sesión con esas credenciales."})
      
    })
  }
 
  return (
   <Container className='mt-5 mb-5' >
      <Row>
        <Col sm="12"  lg={{span:10,offset:1}}>
          <Card body>
            {errors.auth && <Alert variant="danger">{errors.auth}</Alert>}
            <h3>Crear Post</h3>
            <hr/>
            <NewPostForm errors={errors} onSubmitCallback={login}></NewPostForm>
            

          </Card>
        
        </Col>
      </Row>
   </Container>
  )
}

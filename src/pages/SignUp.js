import React,{useEffect, useState} from 'react'
import { Container,Row,Col,Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { useNavigate} from "react-router-dom"

import { isObjEmpty } from '../helpers/helpers'
import {  loginUser, registerUser } from '../actions/authActions'
import SignUpForm from '../components/forms/SignUpForm'

export default function SignUp() {

  const [errors, setErrors] = useState({})

  const dispatch=useDispatch()
  const loggedIn=useSelector(state=>state.auth.loggedIn)
  const history= useNavigate()

  useEffect(() => {
    if(loggedIn){
        history("/")


    }
    
  })
  

  const register =({email,password,firstName,lastName})=>{
    const errors={}
    setErrors(errors)
    if(!validator.isEmail(email)){
      errors.email="El correo electrónico es inválido."

    }
    if(!validator.isLength(password,{min:8,max:30})){
      errors.password=
      "La contraseña debe tener entre 8 y 30 caracteres."

    }

    if(validator.isEmpty(firstName)){
      errors.firstName="El nombre es obligatorio."

    }

    if(validator.isEmpty(lastName)){
      errors.lastName="Los apellidos son obligatorios."

    }


    if(!isObjEmpty(errors)){
     
      setErrors(errors)
      return

    }
    
    dispatch(registerUser(
      {email,
       password,
       firstName,
       lastName
      }))
      .then(response=>{
        dispatch(loginUser({email,password}));

    }).catch(err=>{
        setErrors({registerError:err.response.data.message})
      
    })
  }
 
  return (
   <Container>
      <Row>
        <Col 
         sm="12" 
         md={{span:8, offset:2}} 
         lg={{span:6,offset:3}}>
          <Card body>
            {errors.registerError 
             && <Alert variant="danger">
                  {errors.registerError}
                </Alert>}
            <h3>Crear cuenta</h3>
            <hr/>
            <SignUpForm 
             errors={errors} 
             onSubmitCallback={register}>
             </SignUpForm>
            <div className='mt-4'>
              <Link to={"/signup"}>
                ¿Ya tienes una cuenta? Inicia sesión aquí. 
              </Link>

            </div>
          </Card>
        </Col>
      </Row>
   </Container>
  )
}

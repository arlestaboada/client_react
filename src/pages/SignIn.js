import React,{useState} from 'react'
import { Container,Row,Col,Card } from 'react-bootstrap'
import SignInForm from '../components/forms/SignInForm'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import validator from 'validator'
import { isObjEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'

export default function SignIn() {

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
    dispatch(loginUser({email,password })).then(response=>{

    }).catch(err=>{
      
    })
  }
 
  return (
   <Container>
      <Row>
        <Col sm="12" md={{span:8, offset:2}} lg={{span:6,offset:3}}>
          <Card body>
            <h3>Iniciar sesión</h3>
            <hr/>
            <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>
            <div className='mt-4'>
              <Link to={"/signup"}>¿No tienes una cuenta? Registrate aquí</Link>

            </div>

          </Card>
        
        </Col>
      </Row>
   </Container>
  )
}

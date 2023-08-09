import React,{useState} from 'react'
import {Form, Button,Col,Row, FormControl} 
from 'react-bootstrap'

import {exposures} from "../../helpers/exposures"

export default function NewPostForm(
    {errors,
     onSubmitCallback,
     pTitle="",
     pContent="",
     pExposureId=exposures.PUBLIC,
     pExpirationTime=60,
     textButton="Crear post"}
     ) {
   const [title, setTitle] = useState(pTitle)
   const [content, setContent] = useState(pContent)
   const [exposureId, setExposureId] = useState(pExposureId)
   const [expirationTime, setExpirationTime] =
   useState(pExpirationTime)

   const submitForm=(e)=>{
    e.preventDefault()
    onSubmitCallback({title,content,
                       exposureId,expirationTime
                    })

   }


  return (
    
    <Form onSubmit={submitForm}  >
        <Form.Group control="title" className='mb-3'>
            <Form.Label>Titulo</Form.Label>
            <Form.Control
                type="text"
                value={title}
                onChange={e=>setTitle(e.target.value)}
                placeholder='Ejemplo: Creando el primer post'
                isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
               
                {
                  
                errors.title
                
                }

            </Form.Control.Feedback>

        </Form.Group>
        <Row>
            <Col md="6" xs="12">
                <Form.Group 
                    controlId='expirationTime' 
                    className='mb-3'>
                    <Form.Label>
                      Tiempo de expiración
                    </Form.Label>
                    <FormControl 
                        disabled={exposureId==exposures.PRIVATE}
                        as="select" 
                        value={expirationTime}
                        onChange={
                            e=>setExpirationTime(e.target.value)
                        }>
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="120">2 horas</option>
                        <option value="360">6 horas</option>
                        <option value="720">12 horas</option>
                        <option value="1440">1 día</option>

                    </FormControl>
                    <Form.Control.Feedback type="invalid">
                        
                        {
                            
                        errors.expirationTime
                        
                        }
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group 
                    controlId='exposureId'
                    className='mb-3'>
                    <Form.Label>
                        Tipo de post
                    </Form.Label>
                    <div>
                        <Form.Check
                          onChange=
                          {
                            e=>setExposureId(e.target.value)
                          }
                          checked={
                            exposureId==exposures.PRIVATE
                          }
                          value={exposures.PRIVATE}
                          inline
                          label="Privado"
                          name="exposureId"
                          type='radio'
                        >

                        </Form.Check>
                        <Form.Check
                          onChange={
                            e=>setExposureId(e.target.value)
                          }
                          checked={exposureId==exposures.PUBLIC}
                          value={exposures.PUBLIC}
                          inline
                          label="Público"
                          name="exposureId"
                          type='radio'
                        >

                        </Form.Check>
                    </div>
                        
                    <Form.Control.Feedback type="invalid">
                        
                        {
                            
                        errors.exposureId
                        
                        }
                    </Form.Control.Feedback>

                </Form.Group>

            </Col>
        </Row>
        <Form.Group control="content" className='mb-3'>
            <Form.Label>Contenido</Form.Label>
            <Form.Control
                as="textarea"
                rows={10}
                value={content}
                onChange={e=>setContent(e.target.value)}
                isInvalid={errors.content}
            />
            <Form.Control.Feedback type="invalid">
                        
                        {
                            
                        errors.content
                        
                        }
                    </Form.Control.Feedback>
        </Form.Group>
        <Button  
         variant='primary' 
         type="submit">
            {textButton}
        </Button>

    </Form>
  )
}

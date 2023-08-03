import React,{ useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { POSTS_DETAILS_ENDPOINT } from '../helpers/endpoints'
import axios from 'axios'
import moment from 'moment/moment'
import { Button,Card } from 'react-bootstrap'
import {  Prism as SyntaxHighlighter } from 'react-syntax-highlighter'



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
    <div className='pb-4'>
          {
           post &&(
           <React.Fragment>
              <Card className='mb-4'> 
                <Card.Header>
                  <h1>{post.title}</h1>
                  <p>Creado por {post.user.firstName},
                    {moment(post.createdAt).fromNow()}
                  </p>

                </Card.Header>
               
              </Card>
    
              <Card>
                <Card.Header>
                  <Button variant='primary' className='me-2' size='sm' onClick={()=>{}}>
                    Descargar
                  </Button>
                  <Button variant='primary'    size='sm' onClick={()=>{}}>
                    Copiar al portapapeles
                  </Button>
                </Card.Header>
                    <Card.Body>
                      <SyntaxHighlighter showLineNumbers={true}>
                        {post.content}
                      </SyntaxHighlighter>
                      
                    </Card.Body>
              </Card>
            </React.Fragment>)
            
          }
    </div>
    
  )
}

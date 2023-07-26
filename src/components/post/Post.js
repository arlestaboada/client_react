import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Post({post}) {
  return (
    <Card className='mb-4'>
      <Card.Body>
        <Card.Title>
          <Link to={"/"}>{post.title}</Link>

        </Card.Title>
        <Card.Text>
          Creado por {post.user.firstName},{post.createdAt}

        </Card.Text>
      </Card.Body>
    </Card>
  )
}

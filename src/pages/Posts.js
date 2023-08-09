import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Card} from 'react-bootstrap';

import { PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints'
import Post from "../components/post/Post"
import Placeholder from '../components/utils/Placeholder'
import NoPosts from '../components/utils/NoPosts';




export default function Posts() {
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(()=>{
    axios.get(PUBLIC_POSTS_ENDPOINT)
        .then(response=>{
          setPosts(response.data)
          setFetching(false)

        }).catch(err=>{
          console.log(err)
          setFetching(false)
        })

  },[])
  return (
    <div>
      <Card>
        <h1>Últimos posts publicos</h1>

      </Card>
      {fetching &&   <Placeholder></Placeholder>}
      {!fetching && posts.length===0 && 
        <NoPosts text="No hay post públicos disponibles.">
        </NoPosts>}
    
      <div>
        {posts.map(post=><Post key={post.postId} 
          post={post} renderControls={false}></Post>)}
      </div>
    </div>
  )
}

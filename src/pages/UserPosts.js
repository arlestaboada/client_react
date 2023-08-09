import React from 'react'
import { useEffect,useState } from 'react'
import { Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Post from "../components/post/Post"
import Placeholder from '../components/utils/Placeholder'
import { getUserPosts } from '../actions/postActions'
import NoPosts from '../components/utils/NoPosts'




export default function UserPosts() {

  const [fetching, setFetching] = useState(false)
  const posts=useSelector(store=>store.posts.posts)
  const fetched=useSelector(store=>store.posts.fetched)
  const dispatch=useDispatch()

  useEffect(()=>{
    async function fetchedPosts(){
      if(!fetched){
        try {
          setFetching(true)
          await dispatch(getUserPosts())
          setFetching(false)
        } catch (error) {

          toast.error(error.response.data.message,
            {position:toast.POSITION.BOTTOM_CENTER,
              autoClose:2000})
          
        }

      }

    }
    fetchedPosts()

  },[])
  return (
    <div>
      <Card>
        <h1>Mis Post</h1>

      </Card>
      {fetching &&   <Placeholder></Placeholder>}
      {!fetching &&   posts.length===0 && 
      <NoPosts text="No hay post privados disponibles.">
      </NoPosts>}
      <div>
        {posts.map(post=><Post key={post.postId} 
          post={post} renderControls={true}>

        </Post>)
        }
      </div>
    </div>
  )
}

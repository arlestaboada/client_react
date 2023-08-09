import React from 'react'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {DELETE_POST_ENDPOINT} from '../../../helpers/endpoints'
import { getUserPosts } from '../../../actions/postActions'



export default function DeletePostButton({postId,title}) {
    const dispatch=useDispatch()
    const createAlert=()=>{
        confirmAlert({
            title:"Eliminar post",
            message:
            `¿Estas seguro que deseas eliminar el post ${title}?`,
            buttons:[{
                label:"Sí",
                onClick:()=>{
                    deletePost()
                }
            },
            {
                label:"No",
                onClick:()=>{
                    return false
                }
            }
        ]
        })
    }
    const deletePost=async()=>{

        try {
            await axios.delete(
                `${DELETE_POST_ENDPOINT}/${postId}`
            )
            await dispatch(getUserPosts())
            toast.info("El post se ha eliminado.",{
                position:toast.POSITION.BOTTOM_CENTER,
                autoClose:2000
                })
            
        } catch (error) {

             toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_CENTER,
                autoClose:2000
                })
        }

    }
  return (
    <Button 
        onClick={createAlert}
        variant="danger" 
        size="sm">Eliminar
    </Button>
  )
}
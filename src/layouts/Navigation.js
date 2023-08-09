import React from 'react'
import { Nav,NavDropdown,Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { logoutUser } from '../actions/authActions'

export default function Navigation() {
  const loggedIn=useSelector(state=>state.auth.loggedIn)
  const user=useSelector(state=>state.auth.user)
  const dispatch=useDispatch()
  return (
   <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={NavLink} to="/">React Java</Navbar.Brand>
    <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
    <Navbar.Collapse id="main-menu">
      {
      
        <Nav className="me-auto">
          { loggedIn && ( 
            <Nav.Link  as={NavLink} to="/newpost">
              Create Post
            </Nav.Link>)}
         
        </Nav>
      
      }
        
       
        <Nav > 
          { !loggedIn?(
              <React.Fragment>
                <Nav.Link as={NavLink} to="/signup">
                  Crear cuenta
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signin">
                  Iniciar sesion
                </Nav.Link>
              </React.Fragment>
           )
           :(
                <NavDropdown 
                 title={user.sub} 
                 id="menu-dropdown">
                  <NavDropdown.Item 
                   as={NavLink} 
                   to="/posts">
                    Mis Posts
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    onClick={()=>dispatch(logoutUser())}>
                    Cerrar sesion
                  </NavDropdown.Item>
                </NavDropdown>
             
             )


          }
              

        </Nav>

    </Navbar.Collapse>


   </Navbar>
  )
}


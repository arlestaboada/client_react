import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "./layouts/Navigation"
import { Route, BrowserRouter as Router,Routes} 
from "react-router-dom"
import { Container } from "react-bootstrap"
import { Provider } from "react-redux"

import Posts from "./pages/Posts"
import SignIn from "./pages/SignIn"
import UserPosts from "./pages/UserPosts"
import SignUp from "./pages/SignUp"
import PostDetails from "./pages/PostDetails"
import NewPost from "./pages/NewPost"
import EditPost from "./pages/EditPost"

import store from "./store"
import checkForToken from "./helpers/checkForToken"
import PrivateRoute from "./utils/PrivateRoute"


import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"
import 'react-confirm-alert/src/react-confirm-alert.css'



import moment from "moment"
import "moment/locale/es"


moment.locale("es")



checkForToken()
function App() {
  return (
    <Provider store={store}>
        <Router>
          <div>
            <Navigation>

            </Navigation>
          </div>
            
            <Container>
              <ToastContainer/>
              <Routes>
                
                  <Route 
                    exact 
                    path="/" 
                    Component={Posts}>
                    </Route>
                  <Route 
                    exact 
                    path="/signin" 
                    Component={SignIn}>

                   </Route>
                  <Route 
                    exact 
                    path="/signup" 
                    Component={SignUp}>
                    
                  </Route>
                  

                  <Route 
                    exact 
                    path="/post/:id" 
                    Component={PostDetails}>
                  </Route>

                  <Route 
                  exact 
                  path="/posts" 
                  element=
                  {<PrivateRoute >
                    <UserPosts/>
                   </PrivateRoute>}/>

                  <Route 
                   exact 
                   path="/newpost" 
                   element={
                   <PrivateRoute >
                      <NewPost/>
                    </PrivateRoute>}/>

                   <Route 
                    exact 
                    path="/editpost/:id" 
                    element={
                    <PrivateRoute >
                      <EditPost/>
                    </PrivateRoute>}/>      
                  
              </Routes> 
            </Container> 
      </Router>

    </Provider>
    
   
  );
}

export default App;

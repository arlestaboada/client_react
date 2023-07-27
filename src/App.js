import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "./layouts/Navigation"
import { Route, BrowserRouter as Router,Routes} 
from "react-router-dom"
import { Container } from "react-bootstrap"
import Posts from "./pages/Posts"
import SignIn from "./pages/SignIn"
import UserPosts from "./pages/UserPosts"
import store from "./store"
import { Provider } from "react-redux"
import checkForToken from "./helpers/checkForToken"
import PrivateRoute from "./utils/PrivateRoute"
import SignUp from "./pages/SignUp"
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
              <Routes>
                
                  <Route exact path="/" Component={Posts}></Route>
                  <Route exact path="/signin" Component={SignIn}></Route>
                  <Route exact path="/signup" Component={SignUp}></Route>
                  <Route exact path="/posts" 
                  element={<PrivateRoute ><UserPosts/></PrivateRoute>}/>
                
                 
                  
              </Routes>
              
              
            </Container>

          
      </Router>

    </Provider>
    
   
  );
}

export default App;

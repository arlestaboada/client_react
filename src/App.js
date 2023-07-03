import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "./layouts/Navigation"
import { Route, BrowserRouter as Router,Routes} 
from "react-router-dom"
import { Container } from "react-bootstrap"
import Posts from "./pages/Posts"
import SignIn from "./pages/SignIn"
import store from "./store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div>
            <Navigation>

            </Navigation>
            <Container>
              <Routes>
                <Route exact path="/" Component={Posts}></Route>
                <Route exact path="/signin" Component={SignIn}></Route>
                

              </Routes>
              
            </Container>

          </div>
      </Router>

    </Provider>
    
   
  );
}

export default App;

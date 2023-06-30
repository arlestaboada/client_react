import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "./layouts/Navigation";
import { Route, BrowserRouter as Router,Routes} from "react-router-dom";
import { Container } from "react-bootstrap";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";

function App() {
  return (
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
   
  );
}

export default App;

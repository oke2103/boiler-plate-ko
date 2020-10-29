import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import Register from './components/views/RegisterPage/RegisterPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path="/" component = {LandingPage}/> */}
          <Route exact path="/" component = {Auth(LandingPage, null)}/>
          <Route exact path="/login" component = {Auth(LoginPage, null)}/>
          <Route exact path="/register" component = {Auth(Register, null)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

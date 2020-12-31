import './App.css';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';

// Components
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import Matches from './Components/Matches'
import NotFound from './Components/NotFound'
import About from './Components/About'
import CreateMatch from './Components/CreateMatch'
import AddStadium from './Components/AddStadium'
import EditProfile from './Components/EditProfile'
import Reservations from './Components/Reservations'
// Routes
// import {FanProtectedRoute} from './ProtectedRoutes/FanProtectedRoute';
// import {GuestProtectedRoute} from './ProtectedRoutes/GuestProtectedRoute';
import {LoggedInProtectedRoute} from './ProtectedRoutes/LoggedInProtectedRoute';
import {ManagementProtectedRoute} from './ProtectedRoutes/ManagementProtectedRoute';
import {NotLoggedInRoute} from './ProtectedRoutes/NotLoggedInRoute';

function App() {
  return (
    <Router>
      <Navbar/>    
      <Switch> 

        {/*Public pages */}
        <Route path="/" exact component={Home}/>
        <Route path="/about" exact component={About}/>
        <Route path="/matches" exact component={Matches}/>

        {/*Manager pages */}
        <ManagementProtectedRoute path="/createMatch" exact component={CreateMatch}/>
        <ManagementProtectedRoute path="/addStadium" exact component={AddStadium}/>
    
        {/*Logged In */}
        <LoggedInProtectedRoute path="/editProfile" exact component={EditProfile}/>
        <LoggedInProtectedRoute path="/reservations" exact component={Reservations}/>


        {/*Not Logged In */}
        <NotLoggedInRoute path="/signup" exact component={SignUp}/>
        <NotLoggedInRoute path="/login" exact component={LogIn}/>

        <Route path="/" component={NotFound}/>
      </Switch>
      <Footer/>
    </Router>  
  );
}

export default App;

import './App.css';
import Home from './Pages/Home'
import {Route, Routes, Link, BrowserRouter as Router} from 'react-router-dom'
import CreatePost from './Pages/CreatePost';
import SinglePost from './Pages/SinglePost';
import EditPost from './Pages/EditPost'
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function App() {

  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const user = useSelector((state) => state.loggedUser)
  const authenticated = axios.get('http://localhost:3001/auth/', 
    {
      headers: 
      {
      accessToken: localStorage.getItem('accessToken')
      }
    }).then( (data) => {
      if(data.data.error != null){
        return false;
      } else {
        return true;
      }});
  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          {console.log(isLoggedIn, " : ", authenticated)}
          {(!isLoggedIn && !authenticated) && (
            <Link to="/">Log In</Link>
          )}
          <div className='navbar' style={{display: 'flex', justifyContent: 'flex-end', padding: '0 50px'}}>
          {( isLoggedIn && authenticated) && (
            <div>
                <Link to={`/profile/${user}`}>{user}</Link>
                <Link to="/logout">Log Out</Link> 
            </div>
            )}
          </div>   
        </div>
        <Routes>
          <Route exact path = '/home' element={<Home></Home>} />
          <Route exact path = '/createpost' element={<CreatePost></CreatePost>} />
          <Route exact path = '/post/:id' element={<SinglePost></SinglePost>} />
          <Route exact path = '/post/edit/:id' element={<EditPost></EditPost>} />
          <Route exact path = '/sign-up' element={<Registration></Registration>} />
          <Route exact path = '/' element={<Login></Login>} />
          <Route exact path = '/logout' element={<Logout></Logout>} />
          <Route exact path = '/profile/:user' element={<Profile></Profile>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { resetState } from './store/slices/userslice';
import { useDispatch } from 'react-redux';

function Navigation() {

  const {userlogin} = useSelector(state=>state.userSlice)
  const dispatch=useDispatch()

  function Logout(){
    //remove token from local storage
    localStorage.removeItem('token')
    dispatch(resetState())
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {!userlogin?<>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img 
            src="https://tse4.mm.bing.net/th?id=OIP.KCzWnbfabdUUli4v25y-_AHaEK&pid=Api&P=0&h=180" 
            alt="Logo" 
            width="100" 
            height="60" 
            className="d-inline-block align-text-top" 
          />

        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
      </>:
      <ul>
        <li>
        <Link className='nav-link' to='/login' onClick={Logout}>Logout</Link>
        </li>
      </ul>
      }
    </nav>
  );
}

export default Navigation;

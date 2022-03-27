import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'




export default function Navbar() {
  let location = useLocation();
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">about</Link>
            </li>
          </ul>
          {localStorage.getItem('authToken') != null ?
            <button onClick={handleLogout} className="btn btn-primary mx-1">logout</button>
            : <form className="d-flex">
              <Link to="/login" className="btn btn-primary mx-1">login</Link>
              <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
            </form>}
        </div>
      </div>
    </nav>
  )
}

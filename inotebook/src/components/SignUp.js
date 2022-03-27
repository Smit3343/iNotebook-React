import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [isError, setisError] = useState({
    name: "",
    email: "",
    password: ""
  })
  const emailRegex = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  )
  let navigate = useNavigate();
  const host = "http://localhost:5000";

  const formValid = () => {
    let isValid = false;
    for (let err of Object.values(isError)) {
      if (err.length > 0) {
        isValid = false;
        return isValid;
      }
      else
        isValid = true;
    }

    if (isValid) {
      for (let us of Object.values(user)) {
        if (us.length === 0) {
          isValid = false;
          return isValid;
        }
        else
          isValid = true;
      }
    }
    return isValid;
  }

  const changeState = (e) => {
    const { id, value } = e.target;
    setuser({ ...user, [id]: value });
    let isErr = { ...isError };
    switch (id) {
      case "name":
        isErr.name = value.length === 0
          ? "name is required"
          : ""
        break;
      case "email":
        isErr.email = emailRegex.test(value)
          ? ""
          : "Email address is invalid";
        break;
      case "password":
        isErr.password = value.length < 8
          ? "password must have aleast 8 characters"
          : "";
        break;
      default:
        break;
    }
    setisError(isErr);
  }
  const handleSignUpClick = async (e) => {
    e.preventDefault();
    if (formValid()) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      const resJson = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', resJson.authToken);
        navigate('/')
      }
      else {
        props.showAlert("danger", resJson.error);
      }
    }
  }
  return (
    <div className='container my-3'>
      <h2>Create an Account to use iNotebook</h2>
      <form onSubmit={handleSignUpClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" onChange={changeState} value={user.name} className="form-control" id="name" />
          {isError.name.length > 0 && <span className="invalid-feedback d-block">{isError.name}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" onChange={changeState} value={user.email} className="form-control" id="email" aria-describedby="emailHelp" />
          {isError.email.length > 0 && <span className="invalid-feedback d-block">{isError.email}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={changeState} value={user.password} className="form-control" id="password" />
          {isError.password.length > 0 && <span className="invalid-feedback d-block">{isError.password}</span>}
        </div>
        <button disabled={!formValid()} type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Signup(props) {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:credentials.name, email:credentials.email, password:credentials.password })

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth-token and redirect 
      localStorage.setItem('token ', json.authtoken);
      props.showAlert(" Account created ..sussesfully " , "success")
      navigate('/')


    }else{
      props.showAlert("invalid credentials " , "denger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Cofirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth'



const Login = () => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    const [password,setPassword]=useState('')
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
  const location = useLocation();
    const handleSubmit = async (e)=> {

        e.preventDefault();
        try {
        
          const requestBody = {
            
            email,
            password,
            
          };
          
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          };
           await fetch(`${process.env.REACT_APP_API}/api/v1/auth/login`, requestOptions).

          then(response => {return response.json()} ).then( x => {
            // console.log(x,"ashda")
            if(x?.success)
          {
            toast.success(`${x.message}`);
            setAuth({
              ...auth,
              user: x.user,
              token: x.token
            })
            localStorage.setItem("auth",JSON.stringify(x))
            
            navigate(location.state || '/')
          }
          else{
            toast.error(x.message)
          }

            
          });

  
        } catch (error) {
          console.log(error.message)
          toast.error("Something went wrong")
          
        }
    }
useEffect(()=> {
  if ( auth?.token) navigate('/')
},[auth?.token])

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className='mb-3'>
          <button type="submit" className="btn btn-primary" onClick={() => navigate('/forget-password')}>
            Forget Password
          </button>  
            </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
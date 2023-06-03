import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth'



const ForgetPassword = () => {

    const [email,setEmail]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [answer,setAnswer]=useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e)=> {

        e.preventDefault();
        try {
        
          const requestBody = {
            
            email,
            newPassword,
            answer
            
          };
          
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          };
           await fetch(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, requestOptions).

          then(response => {return response.json()} ).then( x => {
            console.log(x,"ashda")
            if(x?.success)
          {
            toast.success(`${x.message}`);
        
            
            navigate('/login')
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


  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="What is your nickname"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgetPassword;
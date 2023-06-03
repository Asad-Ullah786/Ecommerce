import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Register = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    const [password,setPassword]=useState('')
    const [question,setQuestion]=useState('')


    const navigate = useNavigate();

    const handleSubmit = async (e)=> {

        e.preventDefault();
        try {
          // const responseData = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
          // {
          //   name,email,password,phone,address
          // }
          // );
          // console.log(responseData.status,"data")


          //
          const requestBody = {
            name,
            email,
            password,
            phone,
            address,
            question
          };
          
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          };
           await fetch(`${process.env.REACT_APP_API}/api/v1/auth/register`, requestOptions).

          then(response => {return response.json()} ).then( x => {
            console.log(x,"ashda")
            if(x?.success)
          {
            toast.success(`${x.message}`,{
              duration:2000
            });

            navigate('/login')
          }
          else{
            toast.error(x.message)
          }

            
          });

  // const statusCode = response.status; 

  // console.log(statusCode,"statusCOde");

  // const responseData = await response.json(); 

  // console.log(responseData);
          
          //

          // if(responseData?.success)
          // {
          //   toast.success(`${responseData.message}`,{
          //     duration:2000
          //   });

          //   navigate('/login')
          // }
          // else{
          //   toast.error(responseData.message)
          // }

        } catch (error) {
          console.log(error.message)
          toast.error("Something went wrong")
          
        }
    }

    // useEffect(() => {
    //   toast.success("hello its me",{
    //     duration:5000
    //   });}, [])

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              // required
            />
          </div>

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

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter  Phone Number"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="what is your nickname"
              required
            />
          </div>
         

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register
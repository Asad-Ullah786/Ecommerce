 import {useState,useEffect} from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

export default function PrivateRoute() {
    const [ok,setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async () => {
            fetch(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
                method: 'GET',
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${auth.token}`
                })
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not OK');
                  }
                  return response.json();
                })
                .then(data => {
                 if (data.ok) {
                    setOk(true)
                 }
                 else {
                    setOk(false)
                 }
                })
                .catch(error => {
                  // Handle any errors
                  console.error(error);
                });
        }
        if (auth?.token) authCheck()

    },[auth?.token]);
    return ok ? <Outlet/> : <Spinner/>
}
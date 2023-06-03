import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation} from 'react-router-dom';

const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(2);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue);
        },1000);
         count === 0 && navigate(`/${path}`,{
            state:location.pathname
         });
         
         return () => clearInterval(interval);
    },[count, navigate, location])
  return (
    <div className="d-flex flex-column justify-content-center align-items-center"
        style={{height: "100vh"}}
    >
        <h2>redirecting to you in {count} sec </h2>
      <div className="spinner-border text-danger " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner
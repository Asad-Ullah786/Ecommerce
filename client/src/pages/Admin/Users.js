import React, { useState,useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import moment from 'moment'
import toast from 'react-hot-toast'
import { useAuth } from "../../context/auth";



const Users = () => {
const [auth , setAuth ] = useAuth();
const [users,setUsers] = useState();




  const getUsers = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/v1/auth/all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${auth?.token}`
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          if (x?.success) {
            setUsers(x?.users);
            // setLoading(false)
            // toast.success(`${x.message}`);
            // console.log(x.products, "response");
          } else {
            // console.log();
            // setLoading(false)
            toast.error(x.message);
          }
        });
    } catch (error) {
      //   console.log(error.message);
      // setLoading(false)
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
     getUsers();
 },[])
  return (
    <Layout title={"Dashboard All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact#</th>
                    <th scope="col">Date</th>
                    {/* <th scope="col">Payment</th>
                    <th scope="col">Product name</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  users?.map((c, index) => (
                    <>
                      <tr key={c._id}>
                        <td>{index + 1}</td>
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{moment(c.createdAt).fromNow()}</td>
                        {/* <td>{c?.payment}</td> */}
                        {/* <td > */}
                        {/* {c?.products[0] ? c.products[0].name : ""} */}

                       

                        {/* </td> */}
                        <td>
                          <button
                            className="btn btn-warning ms-2"
                            // onClick={() => handleDelete(c._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            // onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <div className='container mt-3 '>
  {cart?.map((p) => (
  <div className="row card flex-row mb-2 " key={p._id}>
    <div className="col-md-4">
      <img
        src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`}
        className="card-img-top mx-100"
        alt="..."
        height={"200px"}
        width={"200px"}
      />
    </div>
    <div className="col-md-8 p-1">
      <h4>{p.name}</h4>
      <p>{p.description.substring(0, 30)}</p>
      <h4>Price : {p.price} Rs</h4>
      
    </div>
  </div>
))}
  </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

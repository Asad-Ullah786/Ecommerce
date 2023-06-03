import React, { useState,useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import moment from 'moment'
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [orders, setOrders] = useState([2, 3, 4]);
  const [ordersz, setOrdersz] = useState([2, 3, 4]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [chanegStatus, setChangeStatus] = useState('')
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const getOrders = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`, {
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
            setOrders(x?.orders);
            
          } else {
            toast.error(x.message);
          }
        });
    } catch (error) {
        console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateStatus = async (id,status) => {

    
    
    await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            "authorization": `bearer ${auth?.token}`
          },
          body: JSON.stringify({
            status
           
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          // console.log("response",x)
          if (x?.success) {
            toast.success(`${x.message}`);
             getOrders()
          
            
          } else {
            
            toast.error(x.message);
          }
        });
  }
useEffect(()=>{
   if(auth?.token) getOrders()
},[])
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        {" "}
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            
            {
            orders?.map((o,index)=> (
                <div className="border shadow" key={o?._id}>
                  <table className  ="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        {/* for payment o?.payment?.success ? "Success" : "Failed" */}
                        {/* for quantity o?.products?.length*/}
                        {/* <th scope="col">Quantity</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* {orders?.map((c,index) => ( */}
                        <>
                          <tr >
                            <td >{index+1}</td>
                            {/* <td >Delivered</td>
                            */}
                            <Select bordered={false}
                            onChange={(value) => handleUpdateStatus(o._id,value)}
                            //  defaultValue={c?.status}
                            defaultValue={o.status}
                            >
                                {
                                    status.map((s,i)=>(
                                        <Option key={i} value={s}>{s}</Option>
                                    ))
                                }
                            </Select>
                            <td >{o?.buyer?.name}</td>
                            <td >{moment(o?.createdAt).fromNow()}</td>
                            <td >{o?.payment}</td>
                            {/* <td >
                              <button
                                className="btn btn-primary"
                              
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger ms-2"
                              >
                                Delete
                              </button>
                            </td> */}
                          </tr>
                          
                        </>
                      {/* ))} */}
                    </tbody>
                  </table>
                {o?.products?.map((p) => (
                <div className='container mt-3 '>

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
                </div>
              ))}

            </div>
            ))
            }
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;

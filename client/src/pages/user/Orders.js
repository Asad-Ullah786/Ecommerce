import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/Cart'
import moment from "moment"

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [orders, setOrders] = useState([2,4]);
  const getOrders = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/v1/auth/orders`, {
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
          console.log(x.orders,"result")
          if (x?.success) {
            setOrders(x?.orders);
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
   if(auth?.token) getOrders()
},[])
  return (
    <Layout title="Your orders">
    <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>

            <div className="border shadow">
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
                    <th scope="col">Product name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((c,index) => (
                    <>
                      <tr key={c._id} >
                        <td >{index+1}</td>
                        <td >{c.status}</td>
                        <td >{c.buyer?.name}</td>
                        <td >{moment(c.createdAt).fromNow()}</td>
                        <td >{c?.payment}</td>
                        {/* <td > */}
                          {/* {c?.products[0] ? c.products[0].name : ""} */}

                    {
                      c?.products?.map((p,indexp)=>(
                        <td key={p._id}>{p.name}</td>
                      ))
                    }

                        {/* </td> */}
                        <td >
                         
                          <button className="btn btn-danger ms-2"
                          // onClick={() => handleDelete(c._id)}
                          >
                            Cancel
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
  )
}

export default Orders
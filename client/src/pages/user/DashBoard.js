import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/Dashboard.css";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import Products from './../Admin/Products';
const DashBoard = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/v1/auth/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${auth?.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          console.log(x.orders, "result");

          // console.log(p,"product response")
          if (x?.success) {
            setOrders(x.orders);
          } else {
            toast.error(x.message);
          }
        });
    } catch (error) {
      console.log(error.message);

      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, []);

  return (
    <Layout title="User Dashboards">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center text-primary">Your Ordered Products</h2>

            <div className="d-flex flex-wrap">
              {orders?.map((o, index) => (
                <>
                  {o?.products?.map((p) => (
                    <div
                      key={index}
                      className="card m-2 custom-card"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`}
                        className="card-img-top mx-100 img-fluid custom-card-image"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p?.name}</h5>
                        <p className="card-text">
                          {p?.description?.substring(0, 20)}...
                        </p>
                        <p className="card-text">Rs :{p?.price}</p>
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;

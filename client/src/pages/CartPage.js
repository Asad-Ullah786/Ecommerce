import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import DropIn from "braintree-web-drop-in-react";
// import StripCheckOut from 'react-stripe-checkout'

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // const [payAmount, setPayAmount] = useState(0);
  // const [clientToken, setClientToken] = useState();
  // const [clientTokenz, setClientTokenz] = useState({
  //   clientToken:
  //     "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyT0RVM01URTFORFFzSW1wMGFTSTZJbUprTkRnME5UazJMVFpoTlRZdE5HWTRZUzFpTkRSaExXWXlOams1WlRkbFl6WmhNQ0lzSW5OMVlpSTZJbkZrZWpkMk5EZ3pPV3BvYTI0M2VEY2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pY1dSNk4zWTBPRE01YW1ocmJqZDROeUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LjVvVnh5TVVwVnpRVGRmZWFvbklUZzlRaW9OdERrRTJmbTNTMndhaC00NkRrazB3YXNrTUVoVTJSVGZwNC1lWTZLcjY3XzB0WmNxSGxoTjhsYnNSQU1RIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3Fkejd2NDgzOWpoa243eDcvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcWR6N3Y0ODM5amhrbjd4Ny9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6InFkejd2NDgzOWpoa243eDciLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3Fkejd2NDgzOWpoa243eDcifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiR291cmlaYWRhIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZ291cml6YWRhIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn19",
  //   success: true,
  // });
  // const [instance, setInstance] = useState("");
  const navigate = useNavigate();

  const totalCartPrice = () => {
    try {
      let total = 0;

      // let item = cart?.map((e) => e.price);
      total = cart?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      );
      //    console.log(total,"total")

      return total.toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // get payment token
  // const getClinetToken = async () => {
  //   try {
  //     await fetch(
  //       `${process.env.REACT_APP_API}/api/v1/product/braintree/token`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // "authorization": `bearer ${auth?.token}`
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((x) => {
  //         // console.log(x)
  //         if (x?.success) {
  //           setClientToken(x?.token);
  //         } else {
  //           toast.error(x.message);
  //         }
  //       });
  //   } catch (error) {
  //     //   console.log(error.message);

  //     toast.error("Something went wrong");
  //   }
  // };

  //handle paymeny
  // const handlePayment = async () => {
  //   try {
  //     const { nonce } = await instance.requestPaymentMethod();

  //     await fetch(
  //       `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "authorization": `bearer ${auth?.token}`
  //         },
  //         body: JSON.stringify({
  //           nonce,
  //           cart,
  //         }),
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((x) => {
  //         console.log(x)
  //         if (x?.success) {
  //           localStorage.removeItem("cart");
  //           setCart([]);

  //           navigate("/dashboard/user/order");
  //           toast.error(x.message);
  //           setClientToken(x?.token);
  //         } else {
  //           toast.error(x.message);
  //         }
  //       });
  //   } catch (error) {}
  // };

  useEffect(() => {

  }, [auth?.token]);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart?.length} items in your Cart ${
                    auth?.token ? "" : "Please logIn to CheckOut"
                  }`
                : "your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row card flex-row mb-2" key={p._id}>
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
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h4>Total : {totalCartPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/login")}
                      >
                        Please login to checkout
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {/* <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientTokenz,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    // disabled={ !instance || !auth?.user?.address}
                  >
                    Make Payment
                  </button>
                 </>
              )}
            </div> */}
{/*             
            <StripCheckOut
            stripeKey=""
            label="Pay Now"
            name="Pay with Credit card"
            billingAddress
            shippingAddress
            amount={payAmount}
            description={`Your Total is ${totalCartPrice()} `}
            /> */}

                
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

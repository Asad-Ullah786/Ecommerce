import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name,
        email,
        phone,
        address,
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${auth?.token}`,
        },
        body: JSON.stringify(requestBody),
      };
      await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          console.log(x, "ashda");
          if (x?.success) {
            setAuth({...auth,user:x.updatedUser})
            let ls = JSON.parse(localStorage.getItem('auth'));
            ls.user = x?.updatedUser;
            localStorage.setItem("auth",JSON.stringify(ls))
            toast.success(`${x.message}`);
            // navigate("/login");
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
    const { email, name, phone, address } = auth?.user;

    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);
  return (
    <Layout title="Your Profile">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    required
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
                    disabled
                  />
                </div>
                {/* <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    required
                  />
                </div> */}

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

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

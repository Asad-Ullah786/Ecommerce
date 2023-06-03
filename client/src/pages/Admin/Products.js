import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getALll producst
  const getAllProducts = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/v1/product/get-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `bearer ${auth?.token}`
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          if (x?.success) {
            setProducts(x?.products);
             toast.success(`${x.message}`);
            console.log(x, "response");
          } else {
            // console.log();
            toast.error(x.message);
          }
        });
    } catch (error) {
    //   console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">ALl Products List</h1>
          <div className="d-flex flex-wrap m-2 mb-5">
          {products?.map((p) => (
            <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}
            className="product-link"
            >
            <div className="card m-2 custom-card " style={{ width: "18rem", padding: "1rem",marginBottom: '1rem' }}>
              <img src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`} 
              className="custom-card-image card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0,25)}...
                </p>
                
              </div>
            </div>
            </Link>
          ))}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Products;

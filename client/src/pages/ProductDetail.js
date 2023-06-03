import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams ,useNavigate} from 'react-router-dom';
import toast from "react-hot-toast"

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate()
  const [relatedProduct, setRelatedProduct] = useState([])
  const getProduct = async () => {
    try {
      //  toast.success("product")
      // setLoading(true)
      await fetch(`${process.env.REACT_APP_API}/api/v1/product/single-products/${params.slug}`, {
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
            setProduct(x?.product);
            getRealatedProducts(x?.product._id,x?.product.category._id)
            // setLoading(false)
            // toast.success(`${x.message}`);
            //  console.log(x?.product, "response");
          } else {
            // console.log();
            // setLoading(false)
            // toast.error(x.message);
          }
        });
    } catch (error) {
      //   console.log(error.message);
      // setLoading(false)
      // toast.error("Something went wrong");
    }
  };
  const getRealatedProducts = async (pid, cid) => {
    try {
      //  toast.success("product")
      // setLoading(true)
      await fetch(`${process.env.REACT_APP_API}/api/v1/product//related-product/${pid}/${cid}`, {
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
            setRelatedProduct(x?.products);
            // setLoading(false)
            // toast.success(`${x.message}`);
            //  console.log(x?.product, "response");
          } else {
            // console.log();
            // setLoading(false)
            // toast.error(x.message);
          }
        });
    } catch (error) {
      //   console.log(error.message);
      // setLoading(false)
      // toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    // toast.success("useEfffect")
    if (params?.slug) getProduct();
  },[params?.slug])

  return (
    <Layout>
        <div className='row container mt-4'>
          <div className='col-md-6'>
          <img src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${product?._id}`} className="card-img-top" alt="..." 
          height={"400px"}
          width={"auto"}
          />
             
          </div>
          <div className='col-md-6'>
            <h1 className='text-center'>Product Detail</h1>
            <h6>Name:{product?.name}</h6>
            <h6>Description:{product?.description}</h6>
            <h6>Price:{product?.price}</h6>
            <h6>Category:{product?.category?.name}</h6>
            <h6>Quantity:{product?.quantity}</h6>
            <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
          </div>
        </div>
        <hr/>
        <div className='row container'>
          <h1 className='text-center'>Similar Products</h1>
        <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <div key={p._id} className="card m-2 " style={{ width: "20rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`}
                  className="card-img-top  custom-card-image img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,25)}...</p>
                  <p className="card-text text-danger">Rs: {p.price}
                </p>
                  <button className="btn btn-primary ms-1" 
                  onClick={() => navigate(`/product/${p.slug}`)}
                  >More Detail</button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default ProductDetail

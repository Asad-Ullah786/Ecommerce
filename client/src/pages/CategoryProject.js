import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProject = () => {
    const [products ,setProducts] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    const getProductByCat = async () => {
        try {
          //  toast.success("product")
          // setLoading(true)
          await fetch(`${process.env.REACT_APP_API}/api/v1/product/all-product-category/${params.slug}`, {
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

                console.log(x)

              if (x?.success) {
                setProducts(x?.products);
                // setLoading(false)
                // toast.success(`${x.message}`);
                //  console.log(x?.product, "response");
              } else {
                console.log(x);
                // setLoading(false)
                // toast.error(x.message);
              }
            });
        } catch (error) {
            console.log(error.message);
          // setLoading(false)
          // toast.error("Something went wrong");
        }
      };
      useEffect(() => {
        if (params?.slug) getProductByCat();
      },[params?.slug])
  return (
    <Layout>
        <div className='container'>
            <h1 className='text-center'>Category - {products[0]?.category?.name} </h1>
            <h4 className='text-center text-warning'>{products.length} result founds</h4>

    <div className='row offset-1'>   
             <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2 " style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`}
                  className="card-img-top  custom-card-image"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,25)}...</p>
                  <p className="card-text">Rs :{p.price}
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

        </div>
        
        </Layout>


  )
}

export default CategoryProject
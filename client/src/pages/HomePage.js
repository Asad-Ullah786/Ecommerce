import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
// import { useSearch } from "../context/search";
import { useCart } from "../context/Cart";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate() 
  // const [values, setValues] = useSearch();

  const getAllProducts = async () => {
    try {
      // toast.success("product")
      setLoading(true)
      await fetch(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`, {
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
            setLoading(false)
            // toast.success(`${x.message}`);
            // console.log(x.products, "response");
          } else {
            // console.log();
            setLoading(false)
            toast.error(x.message);
          }
        });
    } catch (error) {
      //   console.log(error.message);
      setLoading(false)
      toast.error("Something went wrong");
    }
  };
  const getCategories = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/v1/category/categories`, {
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
            setCategories(x?.categories);
            // toast.success(`${x.message}`);
            // console.log(x, "response");
          } else {
            console.log();
            toast.error(x.message);
          }
        });
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...selected];
    console.log(all,"alll")
     setSelected(all);
    if (value) {
      all.push(id);
    } 
    else {
      all = all.filter((c) => c !== id);
    }
    setSelected(all)
  };
  //filter PRoducts
  const getFilterProducts = async () => {
    try {
      
      // toast.success("filter")
      await fetch(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `bearer ${auth?.token}`
        },
        body:JSON.stringify({
          selected,
          radio
        })
      })
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          // console.log(x,'ahsdashdjhd')
          if (x?.success) {
            setProducts(x?.products);
            // toast.success(`${x.message}`);
            // console.log(x.products, "response");
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
  // getotal count
  const getCountProducts = async () => {
    try {
      // toast.success("product")
      await fetch(`${process.env.REACT_APP_API}/api/v1/product/product-count`, {
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
            setTotal(x?.total);
            // toast.success(`${x.message}`);
            // console.log(x.products, "response");
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
  // loadMOre
  const loadMOre = async () => {
    try {
      // toast.success("product")
      setLoading(true)
      await fetch(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`, {
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
            setProducts([...products,...x?.products]);
            setLoading(false)
            //  toast.success(`${x.message}`);
            //  console.log(x.products, "response");
          } else {
            // console.log();
            setLoading(false)
            toast.error(x.message);
          }
        });
    } catch (error) {
      //   console.log(error.message);
      setLoading(false)
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMOre();
  },[page])

  useEffect(() => {
   if (!selected.length && ! radio.length) getAllProducts();
    
  }, [selected.length,radio.length]);

  useEffect(() => {
    // console.log(radio,"radio")
   if (selected.length ||  radio.length) getFilterProducts();
    
  }, [selected,radio]);
  
  useEffect(() => {
   getCategories();
   getCountProducts();
    
  }, []);


  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row container-fluid mt-3">
        <div className="col-md-3 ">
          <h4 className="text-center">Filter By Category </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              // <h5 key={c._id}>{}</h5>?
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Prices?.map((p) => (
            <div key={p._id}>
              <Radio
            value={p.array}
            >
                {p.name}
              </Radio>
              </div>
            ))}
            </Radio.Group>
            
          </div>
          <div className="d-flex flex-column mt-2">
           <button className="btn btn-danger"
           onClick={() => window.location.reload()}
           >Clear Filter</button>
          </div>
          {/* <SearchInput/> */}
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2 custom-card" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`}
                  className="card-img-top mx-100 img-fluid custom-card-image"
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
                  <button className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart,p]);
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                    toast.success('item added to your cart')
                  }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
       
          {products && products.length >= 6 && products.length < total && (
            <button className="btn btn-warning mb-3" 
            style={{ display: "block", margin: "0 auto" }}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}>
              {
                loading ? 'loading ......' :"Load More ↻"
              }
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

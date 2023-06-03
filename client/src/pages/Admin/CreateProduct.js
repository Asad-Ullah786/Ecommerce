import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const { Option } = Select;
// import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  
  const [auth] = useAuth();
  const navigate = useNavigate();

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
            ;
            toast.error(x.message);
          }
        });
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("shipping",shipping)

      //shi
      // for (const [key, value] of productData.entries()) {
      //   console.log(`${key}:`, value);
      //}
      //

      await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        {
          method: "POST",
          headers: {
            
            "authorization": `bearer ${auth?.token}`
          },
          body: productData,
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          if (x?.success) {
            toast.success(`${x.message}`);
            navigate('/dashboard/admin/products')
            
          } else {
            ;
            toast.error(x.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout title={"Dashboard Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select a category"
                size="medium"
                showSearch
                className="form-select mb-3"
                onChange={(val) => setCategory(val)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="small"
                  // showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  required
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import Header from "./../../components/Layout/Header";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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
            setCategories(x.categories);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //network reqiest
      await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${auth?.token}`,
          },
          body: JSON.stringify({
            name,
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((x) => {
          console.log(x,"response")
          if (x?.success) {
            setName("")
            getCategories();
            toast.success(`${name} : ${x.message}`);
          } else {
            console.log();
            toast.error(x.message);
          }
        });
    } catch (error) {
      //network reqiest
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${auth?.token}`,
          },
          body: JSON.stringify({
            name: updatedName,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response?.success) {
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getCategories()
            toast.success("Category Updated");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("SomeThing Went Wrong");
    }
  };
  const handleDelete = async (pid) => {
    
    try {
      await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${auth?.token}`,
          }
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log("delete response",response)
          if (response?.success) {
            // setSelected(null);
            // setUpdatedName("");
            // setVisible(false);
             getCategories()
            toast.success("Category is Deleted");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("SomeThing Went Wrong");
    }
  
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Layout title={"Dashboard Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Category Management</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className  ="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c,index) => (
                    <>
                      <tr key={c?._id}>
                        <td >{c.name}</td>
                        <td >
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c)
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

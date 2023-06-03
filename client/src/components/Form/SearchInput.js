import React, { useState } from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                await fetch(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
             
                  },
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((x) => {
                    console.log(x,"search result")
                    if (x?.success) {
                      setValues({...values, results:x?.results});
                     
                      navigate('/search')
                    } else {
                     
                    }
                  });
              
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({...values, keyword: e.target.value})}
      />
      <button className="btn btn-outline-success" type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;

import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values, SetValues] = useSearch();
  return (
    <Layout title="Search Results">
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>
                    {
                        values?.results.length <1 ? "No Product Found" : `Found ${values?.results.length}`
                    }
                </h6>
                <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/single-products-pic/${p._id}`}
                  className="card-img-top mx-100 custom-card-image"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,25)}...</p>
                  <p className="card-text">Rs :{p.price}
                </p>
                  <button className="btn btn-primary ms-1">More Detail</button>
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

export default Search
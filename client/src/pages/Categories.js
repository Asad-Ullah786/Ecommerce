import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories = useCategory();
  return (
    <Layout>
        <div className='container'>
            <h1 className='text-center'>All Categories</h1>
            <div className='row'>
                <div className="col-md-6 mx-auto">
                {
                    categories?.map((c) => (
                        <div key={c._id}
                         className='d-flex btn btn-warning mt-3 mb-3 w-50 min-w-200'>
                        <Link className='fs-5 text-dark text-center p-2 text-decoration-none' style={{width: '100%'}}
                        to={`/category/${c.slug}`}
                        >{c.name}</Link>
                      </div>
                    ))
                }   
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Categories
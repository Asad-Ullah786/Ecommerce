import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend, BiSupport,BiPhoneCall} from "react-icons/bi"

const Contact = () => {
  return (
    
    <Layout>
      <div className='row contactus'>
        <div className='col-md-6'>
          <img
          src='/images/contactus.jpeg'
          style={{width:'100%'}}
          alt='contactus'
          />
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>Contact Us</h1>
          <p className='text-justify mt-2'>
            any quert and info about products feel free to call anytime we 24/7 available
            </p>
            <p className='mt-3'>
              <BiMailSend/> :ww.help@ecommerceapp.com
            </p>
            <p className='mt-3'>
              <BiPhoneCall/> :021-22344566
            </p>
            <p className='mt-3'>
              <BiSupport/> :1800-0000-0000(tool free)
            </p>
        </div>

      </div>
    </Layout>
  )
  
}

export default Contact

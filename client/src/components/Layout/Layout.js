import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import {Toaster } from 'react-hot-toast'

const Layout = (props) => {
  return (
    <>
    <Helmet>
      <meta charSet='utf-8'/>
      <meta name='description' content={props.description}/>
      <meta name='keywords' content={props.keywords}/>
      <meta name='author' content={props.author}/>
      <title>{props.title}</title>
      {/* <link ref='canonical' href='http://mysite.com/example'/>   */}
    </Helmet>
    <Header/>
    <main style={{minHeight:"70vh"}}>
      <Toaster/>
      {props.children}</main>
    
    <Footer/>
    </>
  )
}
Layout.defaultProps = {
  title: "Ecommerce App",
  description: "Mern Stack Project",
  keywords: "mern,react,node,mongodb",
  author: 'Gouri'
}

export default Layout
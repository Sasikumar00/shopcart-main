import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';
import { useUserDropDown } from '../context/dropdownUserContext';
import { useCategoryDropDown } from '../context/dropdownCategoriesContext';
// import LogoutListener from './LogoutListener';

const Layout = (props) => {
  const {isOpen, setIsOpen} = useUserDropDown()
  const {isCategoryOpen, setIsCategoryOpen} = useCategoryDropDown()
  return (
    <div className='relative h-full'>
    <Helmet>
        <meta charSet='UTF-8'/>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name='author' content={props.author} />
        <title>{props.title}</title>
    </Helmet>
    <Navbar />
    <div className="main pb-96" onClick={()=>{
      if(isOpen) setIsOpen(!isOpen)
      if(isCategoryOpen) setIsCategoryOpen(!isCategoryOpen)
    }}>
    <Toaster/>
    {props.children}
    </div>
    <Footer />
    {/* <LogoutListener/> */}
    </div>
  )
}

//Setting default props values
Layout.defaultProps={
    title: 'Ecommerce',
    description: 'An online ecommerce platform',
    keywords: 'mern,react,node,mongodb',
    author: 'Ecommerce'
}

export default Layout
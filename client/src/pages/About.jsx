import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce"}>
        <div className='grid grid-cols-2 w-full h-[80vh] items-center p-10'>
        <img className='w-[50rem]' src='/images/about-us.png' alt="" />
        <div className='h-[50%]'>
            <h1 className='text-5xl bg-gray-800 text-center p-2 text-white'>About Us</h1>
            <p className='text-lg mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sapiente iste minus deserunt hic quis ab voluptatum rem deleniti voluptates voluptatem non sunt molestias eaque laborum debitis esse ipsa fugit modi facere, quaerat dolorum cumque facilis vel! Iste exercitationem iusto quo architecto tempore, delectus quia minus vero enim ipsa amet cumque quam animi recusandae laborum ad nobis illo et! Quibusdam atque cupiditate recusandae quidem magni deleniti eaque praesentium dolore dolor distinctio nesciunt sequi, dolorem quos quis fugiat excepturi velit nisi, laudantium quam modi iure quas veritatis ut. Asperiores nulla nihil perspiciatis. Dolor soluta harum voluptatum amet recusandae corporis sequi. Qui.</p>
        </div>
        </div>
    </Layout>
  )
}

export default About
import React from 'react'
import Layout from '../components/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy&Policies - Ecommerce"}>
        <div className='grid grid-cols-2 w-full h-[100vh] items-center p-10'>
        <img className='w-[50rem]' src='/images/privacy-policy.svg' alt="" />
        <div className=''>
            <h1 className='text-5xl bg-gray-800 text-center p-2 text-white'>Privacy and Policy</h1>
            <p className='text-lg mt-5 font-semibold'>Privacy and Policy Statement for [Ecommerce App Name]</p>
            <p>At [Ecommerce App Name], we recognize the importance of maintaining the privacy and security of your personal information. This Privacy and Policy statement outlines our practices concerning the collection, use, and protection of user data to ensure a transparent and secure shopping experience.</p>
            <div className='mt-5'>
                <p className='font-bold'>Data Collection and Usage:</p>
                <p>We collect and utilize the minimal personal information necessary to facilitate seamless shopping, order processing, and delivery. This includes your name, contact details, shipping address, and payment information. We do not engage in the sale or sharing of your data with third parties for marketing purposes.</p>
                <p className='font-bold'>Data Security:</p>
                <p>Safeguarding your information is our priority. We employ industry-standard security protocols, including encryption and robust access controls, to prevent unauthorized access, disclosure, alteration, or destruction of your data.</p>
                <p className='font-bold'>Consent and Rights:</p>
                <p>By using [Ecommerce App Name], you consent to the collection and use of your data as outlined in this policy. You have the right to access, update, and delete your personal information. We are dedicated to assisting you in managing your data and respecting your preferences.</p>
                <p className='font-bold'>Transparency and Accountability:</p>
                <p>Our commitment to transparency is evident in our Privacy and Policy practices. We encourage you to review our comprehensive Privacy Policy available on our app and website, which provides detailed information about data handling, retention, and your rights.</p>
                <p className='font-bold'>Contact Us:</p>
                <p>For any inquiries or concerns about our Privacy and Policy statement or your personal data, please contact our dedicated Privacy team at [contact email/phone number].</p>
                <p className='mt-2'>At [Ecommerce App Name], we prioritize your privacy, striving to create a secure and trustworthy shopping environment. Your trust is integral to our success, and we remain devoted to upholding the highest standards of privacy and data protection.</p>
                <p className='mt-6'>Date: 3 August 2023</p>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Policy
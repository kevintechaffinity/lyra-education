import React from 'react'
import Image1 from 'next/legacy/image'
import Cancel from '../public/images/cancel.svg'

const FailedPay = () => {
  return (
    <div className='w-100 my-5 d-flex justify-content-center align-items-center'>
      <div className='bg-white d-flex flex-column align-items-center shadow px-5 py-3'>
        <Image1 src={Cancel} width="80" height="80" />
        <h5 className='text-center my-4 text-danger'>Payment Failed</h5>
        <p className='text-center'><small className='text-muted'> You just need to check again with your payment method for the issue. <br /> Or try again with on-time inputs.</small></p>
        <button className='btn btn-danger rounded w-100 mb-3'>Try Again</button>
      </div>
    </div>
  )
}

export default FailedPay
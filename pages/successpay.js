import React from 'react'
import Image1 from 'next/legacy/image'
import Success from '../public/images/success.svg'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SuccessPay = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const item = searchParams.get('item');

  return (
    <div className='w-100 my-5 d-flex justify-content-center align-items-center'>
      <div className='bg-white d-flex flex-column align-items-center shadow px-5 py-3'>
        <Image1 src={Success} width="80" height="80" />
        <h5 className='text-center my-4 text-success'>Payment Failed</h5>
        <p className='text-center'><small className='text-muted'> Thanks for yout commitment to our platform. <br /> It's always great time with us.</small></p>
        <Link className='btn btn-success rounded w-100 mb-3' href={'/'}>Done</Link>
      </div>
    </div>
  )
}

export default SuccessPay
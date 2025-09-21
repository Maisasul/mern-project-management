import React from 'react'
import { Link } from 'react-router'
import img from '../assets/images/404.svg';

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6'>
      <img src={img} alt='404 Not Found" className="ww-80 h-auto mb-6 sm:w-96' />
      <p className='text-gray-500 text-center font-semibold'>
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to='/'
        className='mt-6 px-6 py-2 bg-[#92e3a9] text-[#263238] rounded-lg shadow hover:bg-[#92e3a9]-700 transition-colors'
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound
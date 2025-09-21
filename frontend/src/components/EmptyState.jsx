import React from 'react'

const EmptyState = ({image, title, message, action}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start'>
      <img src={image} alt='no data' className='w-80 h-auto sm:w-96' />
      <h2 className="text-xl sm:text-2xl text-gray-600  font-bold">
        {title}
      </h2>
      <p className='text-gray-500 text-center font-semibold'>
        {message}
      </p>
      {action && 
        <div className='mt-3'>
          {action}
        </div>
      }
    </div>
  )
}

export default EmptyState
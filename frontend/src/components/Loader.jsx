import React from 'react'

const Loader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-20 h-20 border-8 border-green-600 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader
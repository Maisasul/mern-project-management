import React from 'react'
import { Plus } from 'lucide-react'

const Navbar = ({title, buttonText, onAdd}) => {
  return (
    <header className='bg-white border-b border-slate-200/50'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-gray-700'>
            {title}
          </h1>
          <div className='flex item-center gap-4'>
            <button
              onClick={onAdd}
              className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              <Plus />
              <span>{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
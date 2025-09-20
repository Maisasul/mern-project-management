import React from 'react'
import { Plus } from 'lucide-react'

const Navbar = ({title, actions}) => {
  return (
    <header className='bg-white border-b border-slate-200/50'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-gray-700'>
            {title}
          </h1>
          <div className='flex items-center gap-4'>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition-colors ${action.className}`}
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
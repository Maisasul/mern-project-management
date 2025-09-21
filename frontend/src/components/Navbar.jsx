import React from 'react'

const Navbar = ({title, actions, icon, iconBgColor}) => {
  return (
    <div className='bg-white/80 shadow-sm px-7 py-7 sm:px-7 sm:py-7'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center shadow-lg duration-200`}>
            {icon}
          </div>
          <h1 className='text-xl sm:text-3xl font-bold text-gray-700'>
            {title}
          </h1>
        </div>
        <div className='flex items-center gap-4 font-bold'>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 ${action.className}`}
            >
              {action.icon}
              {action.text && (
                <span className='hidden sm:inline'>{action.text}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
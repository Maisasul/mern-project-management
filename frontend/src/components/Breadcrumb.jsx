import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Breadcrumb = ({items}) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4 py-2 px-9">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.to ? (
            <Link 
              to={item.to} 
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">{item.label}</span>
          )}

          {index < items.length - 1 && (
            <ChevronRight size={16} className="mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
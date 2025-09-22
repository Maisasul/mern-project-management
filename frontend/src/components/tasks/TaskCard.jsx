import { Edit, SquarePen, Trash } from 'lucide-react'
import React from 'react'

const TaskCard = ({task, onEdit, onDelete}) => {
  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
      <div className='flex items-center justify-between'>
        <div className='flex-1 pr-4'>
          <h3 className='text-lg font-bold text-gray-800'>{task.title}</h3>
          <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{task.description}</p>
        </div>
        <div className='flex items-center gap-2'>
          <button 
            onClick={() => onEdit(task)}
            className='p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors'
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className='p-2 rounded-full text-blue-500 hover:bg-red-100 transition-colors'
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
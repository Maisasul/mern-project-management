import { Edit, SquarePen, Trash } from 'lucide-react'
import React from 'react'
import TruncatedText from '../TruncatedText'

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 my-3'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-lg font-bold text-gray-800'>{task.title}</h3>
        <div className='flex items-center'>
          <button
            onClick={() => onEdit(task)}
            className='p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-100 transition-colors'
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className='p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-100 transition-colors'
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <p className='text-sm text-gray-500 mt-1'>
        <TruncatedText
          text={task.description || 'No description provided.'}
          limit={100}
        />
      </p>
    </div>
  )
}

export default TaskCard
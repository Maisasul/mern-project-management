import React from 'react'
import TaskCard from './TaskCard'
import { Plus } from 'lucide-react'

const TaskList = ({title, color, tasks, onEdit, onDelete, onAdd }) => {
  return (
    <div className='bg-gray-50 p-4 rounded shadow'>
      <div className='flex items-center justify-between mb-3'>
        <h2 className={`font-semibold mb-3 ${color}`}>
          {title} ({tasks.length})
        </h2>
        {title === "To Do" && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>
      {tasks.length === 0 ? (
        <p className='text-sm text-gray-400'>No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  )
}

export default TaskList
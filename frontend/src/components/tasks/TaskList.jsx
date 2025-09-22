import React from 'react'
import TaskCard from './TaskCard'
import { Plus } from 'lucide-react'

const TaskList = ({title, color, tasks, onEdit, onDelete, onAdd }) => {
  return (
    <div className='bg-white p-4 rounded-xl shadow hover:shadow-md hover:shadow-slate-400/20 h-fit'>
      <div className='flex items-center justify-between mb-3 font-bold text-lg'>
        <h2 className={` mb-3 ${color}`}>
          {title} ({tasks.length})
        </h2>
        {title === "To Do" && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1  text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>
      <div className="space-y-3 overflow-y-auto pr-1 hide-scrollbar" style={{ maxHeight: "500px" }}> 
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
    </div>
  )
}

export default TaskList
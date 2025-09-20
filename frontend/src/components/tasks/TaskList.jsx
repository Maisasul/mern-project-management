import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({title, color, tasks, onEdit, onDelete}) => {
  return (
    <div className='bg-gray-50 p-4 rounded shadow'>
      <h2 className={`font-semibold mb-3 ${color}`}>
        {title} ({tasks.length})
      </h2>
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
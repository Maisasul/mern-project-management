import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  const { summary } = project;

  // calculate total tasks
  const totalTasks = summary
    ? summary.todo + summary.inProgress + summary.done
    : 0;

  // foramt date
  const formattedDate = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    : 'N/A';

  return (
    <Link to={`/projects/${project._id}`}>
      <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 hover:shadow-md hover:shadow-slate-400/20 transition-all duration-300 group'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <p className='text-3xl font-bold text-slate-600 mb-2'>
              {project.name}
            </p>
            <p className='text-sm font-md text-slate-600 mb-4'>
              {project.description}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              Last updated {formattedDate}
            </p>
            {summary ? (
              <div className='flex items-center space-x-2 text-sm font-medium'>
                <div className='flex items-center gap-2'>
                  <span className='w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center pb-0.5'>
                    {summary.done}
                  </span> 
                  <span className='text-blue-600'>Done</span>  
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-6 h-6 rounded-full bg-yellow-400 text-white flex items-center justify-center pb-0.5'>
                    {summary.done}
                  </span> 
                  <span className='text-yellow-400'>Done</span>  
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center pb-0.5'>
                    {summary.done}
                  </span> 
                  <span className='text-green-600'>Done</span>  
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No tasks yet</p>
            )}
          </div>
          <div className='py-2 px-3 rounded-lg bg-slate-300/20 group-hover:scale-110 transition-all duration-300'>
            {totalTasks}
          </div>
        </div>
        

      </div>
    </Link>
  )
}

export default ProjectCard
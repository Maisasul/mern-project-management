import React from 'react'
import { Link } from 'react-router'

const ProjectCard = ({project}) => {
  const { summary } = project;

  return (
    <Link to={`/projects/${project._id}`}>
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-300 group'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-3xl font-bold text-slate-600 mb-2'>
                {project.name}
              </p>
              <p className='text-sm font-md text-slate-600 mb-4'>
                {project.description}
              </p>
              {summary ? (
              <div className='flex items-center space-x-2 text-sm font-semibold'>
                <span className='text-blue-600'>
                    {summary.todo} To Do
                </span>
                <span className='text-yellow-600'>
                    {summary.inProgress} In Progress
                </span><span className='text-green-600'>
                    {summary.done} Done
                </span>
              </div>
              ) : (
                <p className="text-sm text-gray-400">No tasks yet</p>
              )}
            </div>
          </div>
        </div>
    </Link>
  )
}

export default ProjectCard
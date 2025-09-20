import React from 'react'
import ProjectCard from './ProjectCard'

const ProjectList = ({projects}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols2 xl:grid-cols-3 gap-4'>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project}/>
      ))}
    </div>
  )
}

export default ProjectList
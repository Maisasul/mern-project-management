import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'
import ProjectDetailsPage from './pages/ProjectDetailsPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/projects/:id' element={<ProjectDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
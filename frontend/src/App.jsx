import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import NotFound from './pages/NotFound'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/projects/:id' element={<ProjectDetailsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster position='top-right' reversOrder={false} /> 
    </div>
  )
}

export default App
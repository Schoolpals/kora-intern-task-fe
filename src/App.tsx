import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import MainHeader from './components/Header'
import Quiz from './pages/Quiz'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <>
      <div className={`text-primary bg-[#F4F6FA] dark:bg-primary-dark dark:text-white min-h-screen`}>
        <div className='lg:flex justify-center items-center bg-mobile-pattern md:bg-tablet-pattern lg:bg-desktop-pattern dark:bg-mobile-pattern-dark dark:md:bg-tablet-pattern-dark dark:lg:bg-desktop-pattern-dark bg-cover min-h-screen'  >
          <main>
            <MainHeader />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path='/quiz/:id' element={<Quiz />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Signin />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App

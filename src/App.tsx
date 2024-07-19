import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import MainHeader from './components/Header'
import Quiz from './pages/Quiz'


function App() {
  return (
    <>
      <div className={`text-primary bg-[#F4F6FA] dark:bg-primary-dark dark:text-white min-h-screen`}>
        <div className='lg:flex justify-center items-centerbg-mobile-pattern md:bg-tablet-pattern lg:bg-desktop-pattern dark:bg-mobile-pattern-dark dark:md:bg-tablet-pattern-dark dark:lg:bg-desktop-pattern-dark bg-no-repeat min-h-screen'  >
          <main>
            <MainHeader />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path='/quiz/:id' element={<Quiz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App

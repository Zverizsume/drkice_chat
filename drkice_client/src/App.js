import React from 'react'
import theme from './components/theme'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Private from './components/privateRoute'
import Layout from './components/layout';
import Home from './pages/home';
import Chat from './pages/chat';
import Register from './pages/register';
import Login from './pages/login';

export default function App() {

  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Private><Home /></Private>} />
            <Route path='chat' element={<Private><Chat /></Private>} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
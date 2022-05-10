import React from 'react'
import Navbar from './navbar'
import {
   Container
} from '@mui/material'
import { Outlet, Link } from 'react-router-dom'

export default function Layout () {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


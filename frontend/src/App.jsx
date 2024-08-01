import { useState } from 'react'
import './App.css'
import Layout from './components/layout/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer />
     <Layout/>
    </>
  )
}

export default App

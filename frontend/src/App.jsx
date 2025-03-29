import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/Homepage"
import SignUpPage from './pages/SignupPage'
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'
import {Loader2} from "lucide-react"
import {Toaster} from "react-hot-toast"
function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log({authUser})
  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className="size-10 animate-spin"></Loader2>
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App

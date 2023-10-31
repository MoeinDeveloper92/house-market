import React from 'react'
import { Routes, Route } from "react-router-dom"
import Explore from './pages/Explore'
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForggotPassword"
import Navbar from './components/Navbar'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoutes from './components/PrivateRoutes'
const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Explore />} />
        <Route path='/offers' element={<Offers />} />

        <Route path='/profile' element={<PrivateRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
      <Navbar />
      <ToastContainer />
    </>
  )
}

export default App
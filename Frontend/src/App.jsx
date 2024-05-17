import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import SignInForm from './Components/SignInPage/Signinpage'
import Adminpanel from './Components/AdminPanel/adminpanel';


const App =() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/admin" element={<Adminpanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";
import Auth from './components/Pages/auth_page';
import Profile from './components/Pages/profile_page';
import Carpeta from './components/Pages/carpeta_page';
import { RequireAuth } from './components/Auth/RequireAuth';
import NavbarComponent from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './components/Auth/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/profile' element={<RequireAuth id={"01"} children={<Profile />} />} />
            <Route path='/carpeta' element={<RequireAuth id={"0"} children={<Carpeta />} />} />
          </Routes>
        </BrowserRouter>1
      </ AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
<NavbarComponent />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//layouts
import RootLayout from "./layouts/RootLayout";
// pages
import HomePage from "./pages/HomePage";
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import AddPaintingPage from './pages/AddPainting';

function App() {
  //getting user to allow access only to certain pages
  const { user } = useAuthContext();
  //creating different routes for each page
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
          <Route 
              path="/"
              element={<HomePage/>} />
          <Route 
              path="/about"
              element={<AboutPage/>} />
          <Route 
              path="/contact"
              element={<ContactPage/>} />
          <Route 
              path="/zaloguj"
              element={<LoginPage/>} />
          <Route 
              path="/dodaj"
              element={!user ? <LoginPage/> : <AddPaintingPage/>} />
          {/* error catching */}
          <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return (
    <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;

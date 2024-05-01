//main imports
import React from 'react';
import '../index.css';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
    
    return (
        <div className="root-layout">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
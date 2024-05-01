import React from 'react';
import '../App.css';
import Photo from '../assets/photos/profile_photo_square.jpg';

export default function AboutPage() {
    return (
        <div className="section about">
            <div>
                <img src={Photo} className="about-photo" alt="Agnieszka Klimczak fotografia"></img>
            </div>
            <div class="abouthalf">
                <h1>O mnie</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    )
}
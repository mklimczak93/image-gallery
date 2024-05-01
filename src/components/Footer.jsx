import React from "react";
import { NavLink } from 'react-router-dom';
import Logo from "../assets/logos/hor-logo-150-black.svg";


export default function Footer() {
    return (
<div id="footer">
            <NavLink to="/" >
                <img src={Logo} className="footer-logo" alt="Agnieszka Klimczak - main letter logo" />
            </NavLink>
        <div className="menu" id="footer-menu">
            <div className="footer-column">
                <p>Nawigacja</p>
                <NavLink to="/" className="link footer-link">Obrazy</NavLink>
                <NavLink to="/about" className="link footer-link">O mnie</NavLink>
                <NavLink to="/contact" className="link footer-link">Kontakt</NavLink>
            </div>
            <div className="footer-column">
                <p>Kontakt</p>
                <p>kontakt@agnieszkaklimczak.com</p>
                <p>agnieszka.klimczak.malarstwo@gmail.com</p>
                <p>Instagram: @agnieszka.klimczak.malarstwo</p>
            </div>
            
        </div>
    </div>
    )
}
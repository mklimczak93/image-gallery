import React, { useState, useRef, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Logo from "../assets/logos/hor-logo-300-black.svg";

export default function Navbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(true);

    const hamMenu = useRef();
    const openableMenu = useRef();

    //close the menu once you detect the window.width < 500
    window.addEventListener("resize", () => {
        if (window.innerWidth < 500) {
            console.log('Closing menu because of small screen')
            setIsMenuOpen(false)
        } else {
            setIsMenuOpen(true)
        }
    })

    const handleMobileMenu = () => {
        if (window.innerWidth < 500) {
            if (isMenuOpen === true) {
                //menu is OPEN - we set it to CLOSE
                setIsMenuOpen(false)
            } else {
                //menu is CLOSED - we set it to OPEN
                setIsMenuOpen(true)
            }
        }
    }
    useEffect(()=>{
        if (isMenuOpen === true) {
            //openable menu is OPEN
            hamMenu.current.classList.add("is-active");
            openableMenu.current.classList.remove("invisible");
            openableMenu.current.classList.add("visible");
            
        } else {
            //openable menu is CLOSED
            hamMenu.current.classList.remove("is-active");
            openableMenu.current.classList.remove("visible");
            openableMenu.current.classList.add("invisible");
        }
    }
    ,[isMenuOpen])

    return (
        <nav>
            <NavLink to="/" >
                <img src={Logo} className="navbar-logo" alt="Agnieszka Klimczak - main letter logo" />
            </NavLink>
            <div className="hamburger mobile" id="hamburger-1" ref={hamMenu} onClick = { handleMobileMenu }>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <div className="main-menu" id="nav-menu" ref={openableMenu}>
                <NavLink to="/" className="link navbar-link" onClick = { handleMobileMenu }>Obrazy</NavLink>
                <NavLink to="/about" className="link navbar-link" onClick = { handleMobileMenu }>O mnie</NavLink>
                <NavLink to="/contact" className="link navbar-link" onClick = { handleMobileMenu }>Kontakt</NavLink>
            </div>
        </nav>
    )
}
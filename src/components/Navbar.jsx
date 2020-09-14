import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../logo.svg";

const handleDisplayNav = (navToggler, links) => {
    navToggler.classList.toggle("active");

    links.classList.toggle("show");
};

const Navbar = () => {
    // prettier-ignore
    const navbar = useRef(null), navTgl = useRef(null), links = useRef(null);

    useEffect(() => {
        document.body.style.paddingTop = `${navbar.current.getBoundingClientRect().height}px`;
    }, []);

    return (
        <nav className="Navbar" ref={navbar}>
            <div className="nav-toggler" ref={navTgl} onClick={() => handleDisplayNav(navTgl.current, links.current)}>
                <span></span>
            </div>

            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <ul className="links" ref={links}>
                <li>
                    <NavLink to="/products">Home</NavLink>
                </li>
                <li className="cart">
                    <NavLink to="/cart">
                        <i className="fas fa-cart-plus"></i> My Cart
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

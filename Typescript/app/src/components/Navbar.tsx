import React from "react";
import {NavLink} from "react-router-dom"

export const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper purple darken-2 px1">
                <a href="/" className="brand-logo">React + TS</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">List</NavLink></li>
                    <li><NavLink to="/about/">About</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import "../css/nav.css";
import {useAuth} from "../../context/AuthContext";

export default function NavBar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const {currentUser} = useAuth()
    console.log(currentUser)
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact="true" to="/" className="nav-logo">
                        <div className="row">
                            <div >
                                <i className="fa-solid fa-shopping-cart"/> Store
                            </div>
                        </div>
                    </NavLink>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/"
                                className={(navData) => (navData.isActive ? "active nav-links" : 'nav-links')}
                                onClick={handleClick} >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/store"
                                className={(navData) => (navData.isActive ? "active nav-links" : 'nav-links')}
                                onClick={handleClick}
                            >
                                Store
                            </NavLink>
                        </li>
                        {currentUser ? <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/dashboard"

                                className={(navData) => (navData.isActive ? "active nav-links" : 'nav-links')}
                                onClick={handleClick}
                            >
                                Dashboard
                            </NavLink>
                        </li> : <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/login"

                                className={(navData) => (navData.isActive ? "active nav-links" : 'nav-links')}
                                onClick={handleClick}
                            >
                                Login
                            </NavLink>
                        </li>
                        }

                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/about"

                                className={(navData) => (navData.isActive ? "active nav-links" : 'nav-links')}
                                onClick={handleClick}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/checkout"
                                className={(navData) => (navData.isActive ? "active nav-links" : 'nav-links')}
                                onClick={handleClick} >
                                <i className="fa-solid fa-shopping-cart"/>
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}

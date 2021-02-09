import React from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap";
// import "./NavBar.css"

export const NavBar = (props) => {

    const history = useHistory();
    const userId = localStorage.getItem("kennel_customer");
    const logout = () => {
        localStorage.clear(userId);
        history.push("/");
    }


    return (
        <div className="header-nav">
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">My Dreams</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/add">New Dream</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/animals">Animals</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/customers">Customers</Link>
                </li>
                <li className="navbar__item">
                    <Button variant="outline-primary logout-btn" onClick={logout}>
                        <Link className="navbar__link" to="/login">Logout</Link>
                    </Button>
                </li>
            </ul>
        </div>
    )
}
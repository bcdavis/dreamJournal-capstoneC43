import React, { useState, useContext } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { NavLink, useHistory } from "react-router-dom";

/*
when using react-router-dom and react-bootstrap, need to manually add classes
For example <RRNavLink> needs the specific react-bootstrap classes added for spacing
*/
export const Header = () => {
  const userId = localStorage.getItem("kennel_customer")
  let isLoggedIn = false;
  if (userId !== "") {
    isLoggedIn = true;
  }
  else {
    isLoggedIn = false;
  }
  //do i need the following state with router?
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const logout = () => {
    localStorage.clear(userId);
    history.push("/");
}
 

  return (
    <>
      <Navbar bg="primary" expand="lg" expanded={expanded} className="navbar-dark">
        <Navbar.Brand href="/journalList">REM • LOG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navbar-nav " activeKey="/" onClick={() => setExpanded(false)}> 
            {isLoggedIn &&
              <>
                <Nav.Item className="text-right"><NavLink className="nav-link" to="/journalList">My Journal</NavLink></Nav.Item>
                {/* <Nav.Item className="text-right"><RRNavLink className="nav-link" to="/stats">Dream Stats</RRNavLink></Nav.Item> */}
                <Nav.Item className="text-right"><NavLink className="nav-link" to="/add">New Dream</NavLink></Nav.Item>
                <Button className="nav-link text-right" variant="link" onClick={logout}  style={{border:"0"}}>Logout</Button>
              </>
            }
            {!isLoggedIn &&
              <Nav.Item><NavLink className="nav-link" to="/login">Login to make your list</NavLink></Nav.Item>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
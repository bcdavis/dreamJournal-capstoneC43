import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export const Footer = () => {


    return (
        <>
        <Navbar bg="primary" className="footer">
            <div className="footer-content flex-row">
                <div className="project-author-link">
                    <p>Created by Ben Davis</p>
                </div>
                <div className="project-code-link">
                    <Nav.Link href="#home">
                        <i class="bi bi-github"></i>
                        <p> Project Source Code</p>
                    </Nav.Link>
                </div>
            </div>

        </Navbar>

        </>
    )
}
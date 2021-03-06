import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

export const Footer = () => {

    const history = useHistory();
    const {params} = useParams();

    console.log("params: ", params);

    return (
        <>
        <Navbar bg="primary" className="footer">
            <div className="footer-content flex-row">
                <div className="project-author-link">
                    <Nav.Link href="https://github.com/bcdavis" className="brighten-on-hover flex-row">
                        <p className="color-light">© 2021 Ben Davis</p>
                    </Nav.Link>
                </div>
                <div className="project-code-link">
                    <Nav.Link href="https://github.com/bcdavis/dreamJournal-capstoneC43" className="gh-repo-link brighten-on-hover flex-row">
                        <i className="bi bi-github github-icon-footer color-light"></i>
                        <p className="color-light"> Project Code</p>
                    </Nav.Link>
                </div>
            </div>

        </Navbar>

        </>
    )
}
import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

export const AuthFooter = () => {

    const history = useHistory();
    const {params} = useParams();

    console.log("params: ", params);

    return (
        <>
        <Navbar bg="headings-color" className="footer-auth">
            <div className="footer-content flex-row">
                <div className="project-author-link">
                    <Nav.Link href="https://github.com/bcdavis" className="darken-on-hover flex-row">
                        <p className="color-dark">© 2021 Ben Davis</p>
                    </Nav.Link>
                </div>
                <div className="project-code-link">
                    <Nav.Link href="https://github.com/bcdavis/dreamJournal-capstoneC43" className="gh-repo-link darken-on-hover flex-row">
                        <i className="bi bi-github github-icon-footer color-dark"></i>
                        <p className="color-dark"> Project Code</p>
                    </Nav.Link>
                </div>
            </div>

        </Navbar>

        </>
    )
}
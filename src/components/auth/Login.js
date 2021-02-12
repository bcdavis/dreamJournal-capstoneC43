import React, { useRef, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
// import "./Login.css"


export const Login = props => {
    console.log("--------- Login Page ------------");
    const email = useRef()
    //const password = useRef()
    const existDialog = useRef()
    //const passwordDialog = useRef()
    const history = useHistory();

    useEffect(() => {
        // console.log("JournalEntry -- useEffect");
		handleClose();
	}, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => user.length ? user[0] : false)
    }

    const [validated, setValidated] = useState(false);
    
    

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        setValidated(true);

        if (email.current.value){ // if there's text in the email input box
        existingUserCheck()
            .then(exists => { // go out and grab user, set user = exists
                if (exists) {
                    // if a user exists
                    localStorage.setItem("kennel_customer", exists.id)
                    history.push("/journalList")
                }
                else {              
                        console.log("validated: ", validated)
                        handleShow();  // show the error modal for emails that are valid, but not in the database
                }
            })
        }
    }

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    
    //     setValidated(true);
    //     handleLogin(event)
    // };

    return (
        <>
            <main className="container--login">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>
                {/* <dialog className="dialog dialog--password" ref={passwordDialog}>
                    <div>Password does not match</div>
                    <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
                </dialog> */}
                <div className="center-self outside-form">
                    <h1 className="form--login--title center-self">REM <i class="small bi bi-moon"></i> LOG</h1>
                    <h2 className="center-self">Sign in</h2>
                    <Container className="auth-section center-self">
                        <Form noValidate validated={validated} onSubmit={handleLogin} className="form--login">
                            <fieldset>
                                <Form.Group className="mb-3">
                                    <Form.Label className="input-label">Email address</Form.Label>
                                    <Form.Control required id="email" ref={email} type="email" autoFocus/>
                                    <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
                            {/* <fieldset>
                                <label htmlFor="inputPassword"> Password </label>
                                <input ref={password} type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    required />
                            </fieldset> */}
                            <fieldset>
                                <Button className="auth-submit-btn" type="submit">
                                    Sign in
                                </Button>
                            </fieldset>
                        </Form>
                        <div className="link--register">
                            <Link to="/register">Not registered yet?</Link>
                        </div>
                    </Container>
                </div>
            </main>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="authModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Error: Unregistered Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                The email address you entered does not match any registered user. Check spelling or try another email address. If you'd like to register a new account with this email, click the 'Not registered yet?' link on the login form.
                </Modal.Body>
                <Modal.Footer>
                    <Button className="authModal-closeBtn" variant="primary" onClick={handleClose}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
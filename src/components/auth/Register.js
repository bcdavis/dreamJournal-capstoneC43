import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
// import "./Login.css"

export const Register = () => {
    console.log("--------- Register Page ------------");
    const firstName = useRef()
    const email = useRef()
    const emailDialog = useRef()
    const history = useHistory()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    useEffect(() => {
        // console.log("JournalEntry -- useEffect");
		handleClose();
	}, [])

    //const password = useRef()
    //const verifyPassword = useRef()
    //const passwordDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length) // what is the !! operator? Is it logical NOT?
    }

    const [validated, setValidated] = useState(false);
    
    

    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     const form = e.currentTarget;
    //     if (form.checkValidity() === false) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    //     setValidated(true);

    //     existingUserCheck()
    //         .then(exists => { // go out and grab user, set user = exists
    //             if (exists) {
    //                 // if a user exists
    //                 localStorage.setItem("kennel_customer", exists.id)
    //                 history.push("/")
    //             }
    //             // if (exists && exists.password === password.current.value) {
    //             //     localStorage.setItem("kennel_customer", exists.id)
    //             //     props.history.push("/")
    //             // } else if (exists && exists.password !== password.current.value) {
    //             //     passwordDialog.current.showModal()
    //             else {
    //                 //existDialog.current.showModal()
    //             }
    //         })
    // }

    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        if (email.current.value && firstName.current.value)  {
            existingUserCheck()
                .then(exists => {
                    if (exists) {
                        // if a user email already exists
                        handleShow();                    
                        e.stopPropagation()
                    }

                    else {
                        fetch("http://localhost:8088/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: email.current.value,
                                //password: password.current.value,
                                name: `${firstName.current.value}`
                            })
                        })
                            .then(_ => _.json())
                            .then(createdUser => {
                                if (createdUser.hasOwnProperty("id")) {
                                    localStorage.setItem("kennel_customer", createdUser.id)
                                    history.push("/")
                                }
                            })
                            
                        }
                    })
        }
    }

    return (
        <>
            <main className="container--login">

                {/* <dialog className="dialog dialog--email" ref={emailDialog}>
                    <div>The email address you entered is unavailable</div>
                    <button className="button--close" onClick={e => emailDialog.current.close()}>Close</button>
                </dialog> */}

                <div className="center-self outside-form">
                    <h1 className="form--login--title center-self">REM <i class="small bi bi-moon"></i> LOG</h1>
                    <h2 className="center-self">Register new account</h2>
                    <Container className="auth-section center-self">
                        <Form noValidate validated={validated} onSubmit={handleRegister} className="form--login">
                            <fieldset>
                                <Form.Group className="mb-3">
                                    <Form.Label className="input-label">First Name</Form.Label>
                                    <Form.Control required id="name" ref={firstName} type="text" autoFocus/>
                                    <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="input-label">Email address</Form.Label>
                                    <Form.Control required id="email" ref={email} type="email"/>
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
                                    Create account
                                </Button>
                            </fieldset>
                        </Form>
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
                    <Modal.Title>Error: Email Unavailable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   The email you entered is unavailable. Check spelling or try a different email.
                </Modal.Body>
                <Modal.Footer>
                    <Button className="authModal-closeBtn" variant="primary" onClick={handleClose}>Ok</Button>
                </Modal.Footer>
		    </Modal>
        </>
    )
}

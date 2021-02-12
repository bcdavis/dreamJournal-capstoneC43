// import logo from './logo.svg';
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./components/ApplicationViews.js"
// import { NavBar } from "./components/nav/NavBar.js"
import { Header } from "./components/Header.js"
import { Footer } from "./components/Footer.js"
import { AuthFooter } from "./components/auth/AuthFooter.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import "./scss/custom.scss";
import './scss/custom2.css';

export default function App() {
  console.log("--------- APP ------------");
  return (
    <>
        <Route render={() => {
            if (localStorage.getItem("kennel_customer")) { 
                // only show nav and views if we find a customer already in storage
                return (
                    <>
                        <Header />
                          <main>
                            <ApplicationViews/>
                          </main>
                        <Footer />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route exact path="/login">
            {console.log("I am at the Login page")}
            <Login />
            <AuthFooter />

        </Route> 
        <Route exact path="/register">
            {console.log("I am at the Register page")}
            <Register />
            <AuthFooter />
        </Route> 


    </>
  );
}


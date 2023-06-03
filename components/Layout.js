import React from "react";
import Header from "./Header"
import Footer from "./Footer"
import { Container } from "react-bootstrap";

const Layout = (props) => {
    return (
        <>
            <Header />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
            <Footer/>
        </>
    )
}

export default Layout
import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
                <Container>
                    <Navbar.Text> @Copyright 2023 - PRJ666 Group 7</Navbar.Text>
                </Container>
            </Navbar>
        </>
    )
}

export default Footer
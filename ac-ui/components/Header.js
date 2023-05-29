import React from "react";
import { Container, Navbar, Nav, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt="Logo"
                            src="/black-logo.jpg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{'            '}
                        ASMR Cleaning Service
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/service">Service</Nav.Link>
                            &nbsp;
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="btn btn-primary">Search</Button>
                            </Form>
                            <Nav.Link href="#link">Login/ Sign up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header

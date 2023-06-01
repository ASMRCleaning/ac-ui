import React from "react";
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';


const Header = () => {
    return (
        <>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Nav className="container-fluid">
                    <Navbar.Brand href="/">
                        {/* <img alt="Logo" src="/logo-company.jpg" width="30" height="30" className="d-inline-block align-top" /> {' '}*/}
                        ASMR Cleaning Service
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="navbarColor01">
                        <Nav className="navbar-nav me-auto">
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/about">About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/service">Service</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/service">Contact us</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/service">Login</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Item>
                        <Container className="d-grid gap-1">
                            <Button className="btn btn-outline-success">Get a free quote here</Button>
                        </Container>
                    </Nav.Item>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Form className="d-flex">
                        <Form.Control className="form-control me-sm-2"
                            type="search"
                            placeholder="Search"
                        />
                        <Button className="btn btn-secondary my-2 my-sm-0">Search</Button>
                    </Form>
                </Nav>
            </Navbar >
        </>
    );
}

export default Header

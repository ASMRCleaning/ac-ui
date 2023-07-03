import React from "react";
import { Navbar, Nav, Form, Button, NavDropdown } from 'react-bootstrap';
import { isAuthenticated, removeToken } from "../lib/authenticate";
import { useRouter } from "next/router";


const Header = (props) => {
    const router = useRouter();

    // let token = readToken()

    function logout() {
        removeToken();
        router.push("/");
    }

    return (
        <>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Nav className="container-fluid">
                    <Navbar.Brand href="/">
                        ASMR Cleaning Service
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation" />
                    <Navbar.Collapse id="navbarColor01">
                        <Nav className="navbar-nav me-auto">
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <NavDropdown title="About" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/about"> About Us</NavDropdown.Item>
                                    <NavDropdown.Item href="https://blog.nationwide.com/home/home-maintenance/how-to-clean-house-fast/">Blog</NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.goodhousekeeping.com/home/cleaning/g2550/best-cleaning-tips/">
                                        Cleaning Tips</NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.bhg.com/homekeeping/house-cleaning/tips/eco-friendly-cleaning-ideas/">
                                        Green Cleaning</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <NavDropdown title="Services" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/service"> All Service</NavDropdown.Item>
                                    <NavDropdown.Item href="/service#house-cleaning">House Cleaning</NavDropdown.Item>
                                    <NavDropdown.Item href="/service#movein-cleaning"> Move-in Cleaning</NavDropdown.Item>
                                    <NavDropdown.Item href="/service#moveout-cleaning"> Move out Cleaning</NavDropdown.Item>
                                    <NavDropdown.Item href="/service#green-cleaning"> Green Cleaning</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contactUs">Contact us</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                {!isAuthenticated() ? <Nav.Link href="/login">Login</Nav.Link> :
                                    <Nav.Item >
                                    <NavDropdown title="Hi Customer" id="basic-nav-dropdown">


                                        <NavDropdown.Item href="/userHome"> User Home Page</NavDropdown.Item>
                                        <NavDropdown.Item href="/profile"> Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="/residence">Residence</NavDropdown.Item>
                                        <NavDropdown.Item href="/residenceAddress">Address</NavDropdown.Item>

                                        <NavDropdown.Item href="/booking"> Booking</NavDropdown.Item>
                                        <NavDropdown.Item onClick={logout}> Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>}
                            </Nav.Item>
                            <Nav.Item>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    {/* <Nav.Item>
                        <Container className="d-grid gap-1">
                            <Button className="btn btn-outline-success" href="/questionnaire">Get a free quote here</Button>
                        </Container>
                    </Nav.Item> */}
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
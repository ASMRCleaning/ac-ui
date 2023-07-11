import React, { useEffect, useState } from "react";
import useSWR from 'swr'
import { Col, Row, ListGroup, Card, Pagination, Button, Container, Image, Link } from "react-bootstrap";
import { removeToken } from "../../lib/authenticate";
import { useRouter } from "next/router";

const UserHome = () => {
    const router = useRouter();

    const [cardMenu, setCardMenu] = useState(null);

    // Store where the redirect login page comes from to then redirect to correct page
    const handleCustomerRedirect = (cardNumber) => {
        setCardMenu(cardNumber);

        switch (cardMenu) {
            case 1:
                router.push('/employee/booking');
                break;
            case 2:
                router.push('/employee/customer');
                break;
            case 3:
                router.push('/employee/employee');
                break;
        }
        // router.push('/employee/customer');
    }

    //Remove the token to browser cookie
    function logout() {
        removeToken();
        router.push("/");
    }

    return (
        <>
            <Container className="flex">
                <Row>
                    <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Manager Menu
                    </p>
                </Row>
                <Row>

                    <Col>
                        <Card id="home-products" style={{ width: '25rem' }} onClick={() => handleCustomerRedirect(1)}>
                            <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Subscription</Card.Header>
                            <Card.Img src="/employee/office-cleaning-service.jpg" style={{ width: '100%' }} />
                            <Card.Body>
                                <Card.Text style={{ fontSize: "1.5rem" }}>
                                    <h4>Create or manager Subscription</h4>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card id="home-booking" style={{ width: '25rem' }} onClick={() => handleCustomerRedirect(2)}>
                            <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Customers</Card.Header>
                            <Card.Img src="/employee/customers_2.jpg" style={{ width: '100%' }} />
                            <Card.Body>
                                <Card.Text style={{ fontSize: "10rem" }} >
                                    <h4>Create or manager customers</h4>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card id="home-employees" style={{ width: '25rem' }} onClick={() => handleCustomerRedirect(3)}>
                            <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Employees</Card.Header>
                            <Card.Img src="/employee/employees.jpg" style={{ width: '100%' }} />
                            <Card.Body>
                                <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }} >
                                    <h4>Create or manager employees</h4>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Row>
                        <Col className="col col-sm-6" style={{ paddingTop: "40px", paddingLeft: "150px" }}>
                            <Card id="home-products" style={{ width: '25rem' }} onClick={() => handleCustomerRedirect(1)}>
                                <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Cleaning Services</Card.Header>
                                <Card.Img src="/employee/booking_3.jpg" style={{ width: '100%' }} />
                                <Card.Body>
                                    <Card.Text style={{ fontSize: "1.5rem" }}>
                                        <h4>Create or manager cleaning services</h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col col-sm-6" style={{ paddingTop: "40px", paddingLeft: "150px" }}>
                            <Card id="home-products" style={{ width: '25rem' }} onClick={() => handleCustomerRedirect(1)}>
                                <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Profile</Card.Header>
                                <Card.Img src="/employee/employee_2.jpg" style={{ width: '100%' }} />
                                <Card.Body>
                                    <Card.Text style={{ fontSize: "1.5rem" }}>
                                        <h4>Update your profile</h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Row>
                <br />
                <Row className="flex">
                    <Image src="/userHome-3.jpg" style={{ height: "50%", width: "110%", display: "block" }} />
                </Row>
            </Container>
        </>
    )
}

export default UserHome
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container, Nav } from "react-bootstrap";
import { userInfoAtom } from "../../store";
import { useAtom } from "jotai";
import Link from "next/link";
import { getUserInfo } from "../../lib/user";

const UserHome = () => {
    const [isManager, setIsManager] = useState(false);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    useEffect(() => {
        async function fetchUserLoggedIn() {
            const userData = await getUserInfo();
            setUserInfo({
                username: userData.user.username,
                firstName: userData.user.firstName,
                lastName: userData.user.lastName,
                role: userData.user.role,
                userId: userData.user._id
            });
            //get if the user logged in is a manager or not
            setIsManager(userData.user.role === "manager" ? true : false);
        }
        fetchUserLoggedIn();
    }, []);

    return (
        <>
            <Container className="flex">
                <Row>
                    <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Manager Menu
                    </p>
                </Row>
                <Row>
                    {isManager && (
                        <>
                            <Col>
                                <Link style={{ textDecoration: "none" }} href='/employee/subscription'>
                                    <Card id="home-products" style={{ width: '25rem' }} >
                                        <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Subscription</Card.Header>
                                        <Card.Img src="/employee/office-cleaning-service.jpg" style={{ width: '100%' }} />
                                        <Card.Body>
                                            <Card.Text style={{ fontSize: "1rem" }}>
                                                <h4>Create or manager Subscription</h4>
                                                <br />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                            <Col>
                                <Link style={{ textDecoration: "none" }} href='/employee/customer'>
                                    <Card id="home-booking" style={{ width: '25rem' }}>
                                        <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Customers</Card.Header>
                                        <Card.Img src="/employee/customers_2.jpg" style={{ width: '100%' }} />
                                        <Card.Body>
                                            <Card.Text style={{ fontSize: "5rem" }} >
                                                <h4>Create or manager customers</h4>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                            <Col>
                                <Link style={{ textDecoration: "none" }} href='/employee/employee'>
                                    <Card id="home-employees" style={{ width: '25rem' }}>
                                        <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Employees</Card.Header>
                                        <Card.Img src="/employee/employees.jpg" style={{ width: '100%', height: '50%' }} />
                                        <Card.Body>
                                            <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }} >
                                                <h4>Create or manager employees</h4>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        </>)}

                    <Row>
                        <Col className="col col-sm-6" style={{ paddingTop: "40px", paddingLeft: "150px" }}>
                            <Link style={{ textDecoration: "none" }} href='/employee/visit'>
                                <Card id="home-products" style={{ width: '25rem' }}>
                                    <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Cleaning Services</Card.Header>
                                    <Card.Img src="/employee/booking_3.jpg" style={{ width: '100%' }} />
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: "1.5rem" }}>
                                            <h4>Create or manager cleaning services</h4>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col className="col col-sm-6" style={{ paddingTop: "40px", paddingLeft: "150px" }}>
                            <Link style={{ textDecoration: "none" }} href='/profile'>
                                <Card id="home-products" style={{ width: '25rem' }}>
                                    <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>Profile</Card.Header>
                                    <Card.Img src="/employee/employee_2.jpg" style={{ width: '100%' }} />
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: "1.5rem" }}>
                                            <h4>Update your profile</h4>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Row>
                <br />
            </Container>
        </>
    )
}

export default UserHome

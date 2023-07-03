import React, { useEffect, useState } from "react";
import useSWR from 'swr'
import { Col, Row, ListGroup, Card, Pagination, Button, Container, Image } from "react-bootstrap";
import { removeToken } from "../lib/authenticate";
import { useRouter } from "next/router";

const UserHome = () => {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const router = useRouter();

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/booking`);
    useEffect(() => {
        if (data) {
            setPage(data);
        }
    }, [data]);

    function previous() {
        if (page > 1) {
            setPage(page => page - 1)
        }
    }

    function next() {
        setPage(page => page + 1)
    }

    //Remove the token to browser cookie
    function logout() {
        removeToken();
        router.push("/");
    }

    return (
        <>
            <Row>
                {/* <Col className="col-lg-3">
                    <ListGroup className="nav nav-pills flex-column" >
                        <ListGroup.Item className="nav-item" style={{ width: "100%", height: "100%" }}>
                            <a className="nav-link active" style={{ fontSize: "30px", paddingTop: "5%", paddingBottom: "10%" }}>History</a>
                        </ListGroup.Item>
                        <ListGroup.Item className="nav-item" style={{ width: "100%", height: "100%" }}>
                            <a href="/profile" className="nav-link " style={{ fontSize: "30px", paddingBottom: "10%" }}>Profile</a>
                        </ListGroup.Item>
                        <ListGroup.Item className="nav-item" style={{ width: "100%", height: "100%" }}>
                            <a href="/residence" className="nav-link" style={{ fontSize: "30px", paddingBottom: "10%" }}>Residence</a>
                        </ListGroup.Item>
                        <ListGroup.Item className="nav-item" style={{ width: "100%", height: "100%" }}>
                            <a href="/residenceAddress" className="nav-link" style={{ fontSize: "30px", paddingBottom: "10%" }}>Address</a>
                        </ListGroup.Item>
                        <ListGroup.Item className="nav-item" style={{ width: "100%", height: "100%" }}>
                            <a href="/booking" className="nav-link" style={{ fontSize: "30px", paddingBottom: "10%" }}>Booking</a>
                        </ListGroup.Item>
                        <ListGroup.Item className="nav-item" style={{ width: "100%", height: "100%" }}>
                            <a href="#" className="nav-link" style={{ fontSize: "30px", paddingBottom: "10%" }} onClick={logout}>Logout</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col> */}
                    <Row>
                        <Card style={{margin: "10px"}}>
                            <Card.Body>
                                <h4 style={{ paddingLeft: "30%", fontSize: "30px", color: "#5b62f4" }}>Welcome back, Customer</h4>
                            </Card.Body>
                        </Card>
                    </Row>
                    <br />
                    <Row>
                        <Card style={{margin: "10px"}}>
                            <Card.Body style={{ paddingLeft: "40%" }}>
                                <h4>Upcoming Booking</h4>
                                <p>list here the next booking</p>
                                <Button
                                    href="/booking"
                                    variant="outline-success"
                                    style={{ fontSize: "1.5rem", padding: ".5rem 2rem" }}
                                >
                                    Book now the service
                                </Button>
                            </Card.Body>
                        </Card>
                    </Row><br />
                    <Row>
                        <Card style={{margin: "10px", padding: "10px", paddingBottom: "15%"}}>
                            <Card.Body style={{ paddingLeft: "40%" }}>
                                <h4>Previous Booking</h4>
                                <p>list here the last booking</p>
                            </Card.Body>
                            <Pagination>
                                <Pagination.Prev onClick={previous} />
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={next}></Pagination.Next>
                            </Pagination>
                        </Card>
                    </Row>
                {/* </Col> */}
            </Row>
            <br />
            <Row className="flex">
                <Image src="/userHome-3.jpg" style={{ height: "50%", width: "110%", display: "block" }} />
            </Row>
        </>
    )
}

export default UserHome
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Pagination, Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBookingByEmployee, getBookingById } from "../../lib/booking";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../store";
import { getUserById } from "../../lib/user";
import { formatBookingDate, formatDateToISO } from "../../components/CommonFunction";
import IconTipName from "../../components/IconTipName"; //add icon format and action
import { FcCancel, FcOk, FcPieChart } from "react-icons/fc";

const Visit = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemPerPage = 20;
    const [visitService, setVisitService] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [usersBooking, setUsersBooking] = useState([]);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const today = new Date();
    let visitPerPage = [];

    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    useEffect(() => {
        async function fetchVisitServices() {
            const data = await getBookingByEmployee(userInfo.userId);

            if (data !== null) {
                try {
                    //set booking information
                    setBookings(data.bookings);
                    setVisitService(data.bookings.visits);   //set visits information

                    //get customer userIds that exist in booking
                    const userIds = Array.from(new Set(data.bookings.map(booking => [booking.customerId]).flat())).filter(userId => userId !== null);

                    //call API GET: user by id (user?id=)
                    const userInfo = userIds.map(userId => getUserById(userId));
                    const userData = await Promise.all(userInfo);
                    setUsersBooking(userData);

                    //if get a huge list of visits divide in page with 5 items
                    setTotalPages(Math.ceil(visitService.length / itemPerPage));
                    visitPerPage = visitService.slice(startIndex, endIndex);
                }
                catch (err) {
                    console.error("Error fetching bookings: ", err);
                }
            }
        }
        fetchVisitServices();
    }, []);

    const handleVisitStatus = async (visitId, code) => {

        if (visitService.date >= today) {
            if (code === 0) {
                // const res = await 
                //TODO
            }
        }

    }

    return (
        <>
            {visitPerPage.length <= 0 ?
                <Row>
                    <Card>
                        <Card.Header>
                            <h3 style={{ textAlign: "center", fontSize: "2.5rem" }}>
                                Cleaning Service
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
                                    You do not have any visit service assigned to you.
                                </p>
                                <Col style={{ paddingLeft: "550px" }} className="col col-sm-9">
                                    <Link href="/employee/userHome">
                                        <Button variant="primary"
                                            className="btn btn-outline-info"
                                            style={{ padding: "15px", margin: "1px", width: "50%" }}> Back</Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Card.Img variant="top" src="/card-service-1.jpg" style={{ marginTop: "70px", margin: "50px", width: '90%', height: '100%' }} />
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                :
                <> 
            <Row>
                <Col className="col col-sm-10" style={{ paddingTop: "10px", paddingRight: "30px" }}>
                    <h4 style={{ paddingLeft: "300px", color: "#5b62f4" }}>Visit Services Assigned to you</h4>
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Link href="/employee/subscription">
                        <Button className="btn btn-outline-info btn-sm"
                            variant="primary"
                            style={{ padding: "10px", height: "40px", width: "180px" }}>
                            Back to Home Page
                        </Button>
                    </Link>
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th> Service ID </th>
                                <th> Service Date </th>
                                <th> Customer Name </th>
                                <th> Status </th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {visitPerPage.map(visit => (
                                <tr key={visit._id}>
                                    <td>{visit._id}</td>
                                    <td>{formatBookingDate(visit.date)}</td>
                                    <td>{usersBooking.find(userBooking => userBooking.user._id === booking.customerId) ?
                                        (`${usersBooking.find(userBooking => userBooking.user._id === booking.customerId).user.firstName} ${usersBooking.find(userBooking => userBooking.user._id === booking.customerId).user.lastName}`)
                                        : ('Customer not found')}</td>
                                    <td>{visit.status}</td>
                                    <td>
                                        <IconTipName Icon={FcPieChart} size={30} name="Start" onClick={() => handleVisitStatus(visit._id, 0)} />
                                    </td>
                                    <td>
                                        <IconTipName Icon={FcOk} size={30} name="Complete" onClick={() => handleVisitStatus(visit._id, 1)} />
                                    </td>
                                    <td>
                                        <IconTipName Icon={FcCancel} size={30} name="Cancel" onClick={() => handleVisitStatus(visit._id, 2)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Row>
            </>}
        </>
    );
}

export default Visit
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Pagination, Card, Modal, Alert } from "react-bootstrap";
import Link from "next/link";
import { getBookingByEmployee, updateVisitServiceByBookingId } from "../../lib/booking";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../store";
import { getUserById } from "../../lib/user";
import { formatBookingDate } from "../../components/CommonFunction";
import IconTipName from "../../components/IconTipName"; //add icon format and action
import { FcCancel, FcOk, FcPieChart } from "react-icons/fc";

const Visit = () => {
    const [page, setPage] = useState(1);
    const itemPerPage = 15;
    const [bookings, setBookings] = useState([]);
    const [usersBooking, setUsersBooking] = useState([]);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    //if get a huge list of visits divide in page with 20 items
    const totalVisits = bookings.reduce((total, booking) => total + booking.visits.length, 0);
    const totalPages = Math.ceil(totalVisits / itemPerPage);

    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    // Flatten the visits array from all bookings
    const allVisits = bookings.flatMap((booking) => booking.visits);

    // Use visits for pagination
    const pageVisits = allVisits.slice(startIndex, endIndex);


    useEffect(() => {
        const userId = userInfo.userId;

        async function fetchVisitServices() {
            try {
                const data = await getBookingByEmployee(userId); // Call GET bookings by employeeId logged in
                setBookings(data.bookings);              //set booking information  

                //get customer userIds that exist in booking
                const userIds = Array.from(new Set(data.bookings.map(booking => [booking.customerId]).flat())).filter(userId => userId !== null);

                //call API GET: user by id (user?id=)
                const userInfo = userIds.map(userId => getUserById(userId));
                const userData = await Promise.all(userInfo);
                setUsersBooking(userData);
            }
            catch (err) {
                setErrorMessage("Something went wrong while load bookings. Please try again later.");
                console.error("Error fetching bookings: ", err);
            }
        }
        fetchVisitServices();
    }, []);

    const handleVisitStatus = async (visitId, code, bookingId) => {
        let status = "";

        switch (code) {
            case 0:
                status = 'in progress';
                break;
            case 1:
                status = "completed";
                break;
            case 2:
                status = "cancelled"
                break;
            default:
                break;
        }
        try {
            //call API PUT by bookingId
            const res = await updateVisitServiceByBookingId(bookingId, visitId, status);

            // Update the visit status in the local state
            setBookings(prevBookings =>
                prevBookings.map(booking => {
                    if (booking._id === bookingId) {
                        // Update the visit status in the booking's visits array
                        const updatedVisits = booking.visits.map(visit => {
                            if (visit._id === visitId) {
                                return { ...visit, status };
                            }
                            return visit;
                        });

                        // Return the updated booking object with the updated visits array
                        return { ...booking, visits: updatedVisits };
                    }
                    return booking;
                })
            );

            //show modal with update result
            setResModal(res);
            setShowModal(true);

        } catch (err) {
            setErrorMessage("Something went wrong while update visit. Please try again later.");
            console.error(`Error to update visit status:`, err);
        }
    }

    return (
        <>
            {pageVisits.length <= 0 ?
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
                    <Row >
                        <Col className="col col-sm-10" style={{ paddingTop: "50px", paddingRight: "30px" }}>
                        <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Cleaning Services </p>
                        <br />
                        </Col>
                        <Col className="col col-sm-2" style={{ paddingTop: "50px" }}>
                            <Link href="/employee/userHome">
                                <Button className="btn btn-outline-info btn-sm"
                                    variant="primary"
                                    style={{ padding: "10px", height: "40px", width: "180px" }}>
                                    Back to Home Page
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
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
                                {pageVisits.map((visit) => {
                                    // Find the corresponding booking for the visit
                                    const booking = bookings.find((booking) => booking.visits.includes(visit));

                                    if (!booking) return null; // Skip if the booking is not found (unlikely)

                                    const customer = usersBooking.find((userBooking) => userBooking.user._id === booking.customerId);
                                    return (
                                        <tr key={visit._id}>
                                            <td>{visit._id}</td>
                                            <td>{formatBookingDate(visit.date)}</td>
                                            <td>{customer ? `${customer.user.firstName} ${customer.user.lastName}` : 'Customer not found'}</td>
                                            <td>{visit.status}</td>
                                            <td>
                                                <IconTipName Icon={FcPieChart} size={30} name="Start" onClick={() => handleVisitStatus(visit._id, 0, booking._id)} />
                                            </td>
                                            <td>
                                                <IconTipName Icon={FcOk} size={30} name="Complete" onClick={() => handleVisitStatus(visit._id, 1, booking._id)} />
                                            </td>
                                            <td>
                                                <IconTipName Icon={FcCancel} size={30} name="Cancel" onClick={() => handleVisitStatus(visit._id, 2, booking._id)} />
                                            </td>
                                        </tr>
                                    );
                                })}
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
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cleaning Service Updated</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {resModal && resModal.status === "ok" ? (<p>The cleaning service visit has been updated.</p>)
                                : (<p>Something wrong happened, please try again later</p>)
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    );
}

export default Visit
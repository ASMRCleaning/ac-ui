import React, { useEffect, useState } from "react";
import { Row, Card, Pagination, Button, Image, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userInfoAtom, bookingInfoAtom } from "../../store"
import { getUserInfo } from "../../lib/user";
import { getBookingByCustomer, updateVisitService } from "../../lib/booking";
import { FcCancel } from "react-icons/fc";
import { formatBookingDate } from "../../components/CommonFunction";
import IconTipName from "../../components/IconTipName"; //add icon format and action

const UserHome = () => {
    const [page, setPage] = useState(1);
    const itemPerPage = 5;
    const router = useRouter();
    const [hasSubscription, setHasSubscription] = useState(false);
    const [userVisit, setUserVisit] = useState([]);
    const today = new Date().toISOString();
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);

    //global variable
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);

    //filter upcoming and past visits
    const filteredUpComingVisit = userVisit.filter((visit) => visit.date >= today);
    const filteredPastVisit = userVisit.filter((visit) => visit.date < today);

    //if get a huge list of visits divide in page with 5 items
    const totalPages = Math.ceil(filteredUpComingVisit.length / itemPerPage);

    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const pageUpcomingVisits = filteredUpComingVisit.slice(startIndex, endIndex);

    //cancel visit
    const handleCancelVisit = async (visitId) => {
        const status = "cancelled"
        try {
            //call API PUT by bookingId
            const res = await updateVisitService(visitId, status);

            // Update the visit status in the local state
            setUserVisit(prevVisitService =>
                prevVisitService.map(visit => (visit._id === visitId ? { ...visit, status } : visit))
            );

            //show modal with update result
            setResModal(res);
            setShowModal(true);

        } catch (err) {
            console.error(`Error to update visit status:`, err);
        }
    }

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
        }
        fetchUserLoggedIn();

        async function fetchUserSubscription() {
            const data = await getBookingByCustomer();

            if (data && data.booking) {
                //booking user information
                setBookingInfo({
                    _id: data.booking._id,
                    employee: data.booking.employeeId,
                    customer: data.booking.customerId,
                    residenceId: data.booking.residenceId,
                    status: data.booking.status,
                    serviceType: data.booking.serviceType,
                    frequency: data.booking.frequency,
                    startDate: data.booking.startDate,
                    endDate: data.booking.endDate,
                    specification: data.booking.specification,
                });
                //visit service user information
                setUserVisit(data.booking.visits);

                if (data.booking._id) { setHasSubscription(true); }
                else { setHasSubscription(false); }
            }
        }
        fetchUserSubscription();

    }, []);
    return (
        <>
            <Row>
                <Card style={{ margin: "10px" }}>
                    <Card.Body>
                        <h4 style={{ paddingLeft: "35%", fontSize: "30px", color: "#5b62f4" }}>Welcome {userInfo.firstName} {userInfo.lastName}</h4>
                    </Card.Body>
                </Card>
            </Row>
            <br /><br />
            <Row>
                <Card style={{ margin: "10px" }}>
                    <Card.Body style={{ paddingLeft: "10%", paddingRight: "95px" }}>
                        {hasSubscription ? <> <h4 style={{ paddingLeft: "400px", color: "#5b62f4" }}>Upcoming Booking</h4>
                            <Row>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> Service ID </th>
                                            <th> Service Date </th>
                                            <th> Status </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageUpcomingVisits.map(visit => (
                                            <tr key={visit._id}>
                                                <td>{visit._id}</td>
                                                <td>{formatBookingDate(visit.date)}</td>
                                                <td>{visit.status}</td>
                                                <td>
                                                    <IconTipName Icon={FcCancel} size={30} name="Cancel" onClick={() => handleCancelVisit(visit._id)} />
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
                            </Row></>
                            :
                            <Row style={{ paddingLeft: "15px" }}> <h4 style={{ paddingLeft: "100px" }}> You do not have a booking information. Please register below your service information</h4>
                                <Button
                                    href="/booking/create-booking"
                                    variant="outline-success"
                                    style={{ fontSize: "1.5rem", padding: ".5rem 2rem" }}>
                                    Register your booking here
                                </Button>
                            </Row>}
                    </Card.Body>
                </Card>
                {hasSubscription && filteredPastVisit !== null && (
                    <Card style={{ margin: "10px" }}>
                        <Card.Body style={{ paddingLeft: "10%", paddingRight: "95px" }}>
                            <h4 style={{ paddingLeft: "400px", color: "#5b62f4" }}>Previous services</h4>
                            <Row>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> Service ID </th>
                                            <th> Service Date </th>
                                            <th> Status </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPastVisit.map(visit => (
                                            <tr key={visit._id}>
                                                <td>{visit._id}</td>
                                                <td>{formatBookingDate(visit.date)}</td>
                                                <td>{visit.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Row>
                        </Card.Body>
                    </Card>)}
            </Row>
            <br />
            <br /> <br />
            <Row className="flex">
                <Image src="/userHome-3.jpg" style={{ height: "50%", width: "110%", display: "block" }} />
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cleaning Service Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* update residence information */}
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
    )
}

export default UserHome
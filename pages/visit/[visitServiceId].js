import React, { useEffect, useState } from "react";
import { Row, Col, Button, Pagination, Modal, Alert } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBookingById, updateVisitServiceByBookingId } from "../../lib/booking";
import { useAtom } from "jotai";
import { bookingInfoAtom } from "../../store";
import { getUserById } from "../../lib/user";
import { formatBookingDate, formatDateToISO } from "../../components/CommonFunction";
import IconTipName from "../../components/IconTipName"; //add icon format and action
import { FcCancel, FcOk, FcPieChart } from "react-icons/fc";

const VisitService = () => {
    const router = useRouter();
    const { visitServiceId } = router.query;
    const [page, setPage] = useState(1);
    const itemPerPage = 20;
    const [visitService, setVisitService] = useState([]);
    const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);
    const [employeeUser, setEmployeeUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    //if get a huge list of visits divide in page with 5 items
    const totalPages = Math.ceil(visitService.length / itemPerPage);

    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const visitPerPage = visitService.slice(startIndex, endIndex);

    useEffect(() => {
        async function fetchVisitServices() {
            const data = await getBookingById(visitServiceId);

            if (data !== null) {
                //set booking information
                setBookingInfo({
                    _id: data.bookings._id,
                    employee: data.bookings.employeeId,
                    customer: data.bookings.customerId,
                    residenceId: data.bookings.residenceId,
                    status: data.bookings.status,
                    serviceType: data.bookings.serviceType,
                    frequency: data.bookings.frequency,
                    startDate: data.bookings.startDate,
                    endDate: data.bookings.endDate,
                    specification: data.bookings.specification
                });
                setVisitService(data.bookings.visits);   //set visits information

                if (data.bookings.employeeId) {
                    const userData = await getUserById(data.bookings.employeeId);
                    setEmployeeUser(userData.user);   //set employee info
                }
            }
        }
        fetchVisitServices();
    }, [visitServiceId]);

    const handleVisitStatus = async (visitId, code) => {
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
            const res = await updateVisitServiceByBookingId(bookingInfo._id, visitId, status);

            // Update the visit status in the local state
            setVisitService(prevVisitService =>
                prevVisitService.map(visit => (visit._id === visitId ? { ...visit, status } : visit))
            );

            //show modal with update result
            setResModal(res);
            setShowModal(true);

        } catch (err) {
            setErrorMessage("Something went wrong while update visits. Please try again later.");
            console.error(`Error to update visit status:`, err);
        }
    }

    return (
        <>
            <Row>
                <Col className="col col-sm-10" style={{ paddingTop: "10px", paddingRight: "30px" }}>
                    <h4 style={{ paddingLeft: "300px", color: "#5b62f4" }}>Visit Services for Subscription {bookingInfo._id}</h4>
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
            {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
            <br />
            <br />
            <Row>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> Service ID </th>
                            <th> Service Date </th>
                            <th> Employee Name </th>
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
                                <td>{!employeeUser ? ("Employee not assigned") : employeeUser.firstName + " " + employeeUser.lastName}</td>
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
    );
}

export default VisitService
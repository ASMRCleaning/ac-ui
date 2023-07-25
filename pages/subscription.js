import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Link from "next/link";
import { FcSearch } from "react-icons/fc"
import { AiTwotoneDelete } from "react-icons/ai";
import IconTipName from "../components/IconTipName";
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import { useRouter } from "next/router";
import { getAllBooking, getBookingById } from "../lib/booking";

// const customers = [
//     { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Green Cleaning' },
//     { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Cleaning' },
//     { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Deep Cleaning' },
// ];

const Subscription = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModalD, setShowModalD] = useState(false);

    //global variable from store.js
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    // const filteredCustomers = bookings.filter(booking => booking.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
    // booking.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    // );

    //store information about the previous page to use in next page
    const handlePreviousSession = () => {
       
    }

    useEffect(() => {
        //retrieve residence information when component mounts
        async function fetchBooking() {
            try {
                //calls API GET: all booking 
                const data = await getAllBooking();
                setBookings(data.bookings);
            }
            catch (err) {
                console.error("Error fetching bookings: ", err);
            }
        }
        fetchBooking();
    }, []);

    //hit Delete button
    const showDeleteModal = () => {
        setShowModalD(true);
    }

    const closeDeleteModal = () => {
        setShowModalD(false);
    }

    //delete residence data
    async function handleDeleteRes() {
        try {
            // await removeResidence();

            closeDeleteModal()

            // Reset the form fields
            // setValue("houseType", "");
            // setValue("size", "");
            // setValue("empty", false);
            // setValue("furnished", false);
            // setValue("pet", false);
            // setValue("bedroom", "");
            // setValue("bathroom", "");
            // setValue("den", "");
            // setValue("frequency", "");

            // Clear the residenceInfo atom
            // setResidenceInfo({});

            // Set hasResidence to false
            // setHasResidence(false);
        }

        catch (err) { console.log(err); }
    }

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    //hit Back button
    const handleRedirect = () => {
        userInfo.role === "customer" ? router.push("/userHome") : router.push("/employee/userHome")
    }

    //detail of a bookingId
    const handleBookingDetails = async (id) => {
        try {
            sessionStorage.setItem('source', 'managerS');
            router.push(`/booking/${id}`);
        }
        catch (err) {
            console.error("Error to fetching booking by Id: ", err);
        }

    }
    return (
        <>
            <Row>
                <Col className="col col-sm-7">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by customer name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    {/* <Link href="/register"> */}
                    <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
                        Create Subscription
                    </Button>
                    {/* </Link> */}
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Button className="btn btn-outline-info btn-sm"
                        variant="primary"
                        style={{ padding: "10px", height: "40px", width: "180px" }}
                        onClick={handleRedirect}>
                        Back to Home Page
                    </Button>
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> Subscription ID </th>
                            <th> Customer </th>
                            <th> Service </th>
                            <th> Frequency </th>
                            <th> Start Date </th>
                            <th> End Date </th>
                            <th> employeeId </th>
                            <th> Status </th>
                            <th> </th>
                            <th> </th>
                            {/* <th> </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filteredCustomers.map(booking => ( */}
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{booking.customerId}</td>
                                <td>{booking.serviceType}</td>
                                <td>{booking.frequency}</td>
                                <td>{booking.startDate}</td>
                                <td>{booking.endDate}</td>
                                <td>{booking.employeeId}</td>
                                <td>{booking.status}</td>
                                <td>
                                    <IconTipName Icon={FcSearch} size={30} name="Details" onClick={() => handleBookingDetails(booking._id)} />
                                </td>
                                <td>
                                    <IconTipName Icon={AiTwotoneDelete} size={30} name="Delete" onClick={showDeleteModal} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>

            {/* Delete modal */}
            <Modal show={showModalD} onHide={() => setShowModalD(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete employee profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete this employee profile?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteRes}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <br />
        </>
    );
}

export default Subscription
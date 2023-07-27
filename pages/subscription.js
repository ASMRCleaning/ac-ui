import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Link from "next/link";
import { FcSearch } from "react-icons/fc" //icon detail 
import { AiTwotoneDelete } from "react-icons/ai"; //icon delete
import IconTipName from "../components/IconTipName"; //add icon format and action
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import { useRouter } from "next/router";
import { getAllBooking, removeBooking } from "../lib/booking";
import { getUserById } from "../lib/user";
import { formatBookingDate, capitalizeFirstLetter } from "../components/CommonFunction";

// const customers = [
//     { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Green Cleaning' },
//     { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Cleaning' },
//     { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Deep Cleaning' },
// ];

const Subscription = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [userBooking, setUserBooking] = useState([]);
    const [bookingIdDel, setBookingIdDel] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModalD, setShowModalD] = useState(false);

    //global variable from store.js
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    // const filteredCustomers = bookings.filter(booking => booking.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
    // booking.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    // );

    //Booking data
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


    //Customer and Employee data
    useEffect(() => {
        //retrieve customer information when component mounts
        async function fetchUserBooking() {
            try {
                //get all userIds that exist in booking
                const userIds = Array.from(new Set(bookings.map(booking => [booking.customerId, booking.employeeId]).flat()));

                //call API GET: user by id (user?id=)
                const userInfo = userIds.map(userId => getUserById(userId));
                const userData = await Promise.all(userInfo);

                //convert to Object and make _id as Key
                const userObj = userData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {});

                setUserBooking(userObj);
            }
            catch (err) {
                console.error("Error fetching user information: ", err);
            }
        }

        fetchUserBooking();
    }, [bookings])

    //hit Delete button
    const showDeleteModal = (bookingId) => {
        setBookingIdDel(bookingId);
        setShowModalD(true);
    }

    const closeDeleteModal = () => {
        setShowModalD(false);
    }

    //delete booking data
    async function handleDelete() {
        if (bookingIdDel) {
            try {
                await removeBooking(bookingIdDel);

                //remove booking._id deleted from previous list
                setBookings((prevBooking) => prevBooking.filter((booking) => booking._id !== bookingIdDel));
                closeDeleteModal()
            }
            catch (err) { console.log(err); }
        }

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
            <Row style={{ marginTop: "50px" }}>
                <h3 style={{ textAlign: "center", fontSize: "2.5rem" }}>
                    Subscription Menu
                </h3>
            </Row>
            <Row style={{ marginTop: "70px" }}>
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
                    <Link href="/booking/create-booking">
                    <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
                        Create Subscription
                    </Button>
                    </Link>
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
            <Row style={{ marginTop: "70px", marginBottom: "70px" }}>
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
                                <td>{userBooking[booking.customerId] ? `${user[booking.customerId].firstName} ${user[booking.customerId].lastName}` : 'Loading......'}</td>
                                <td>{capitalizeFirstLetter(booking.serviceType)}</td>
                                <td>{capitalizeFirstLetter(booking.frequency)}</td>
                                <td>{formatBookingDate(booking.startDate)}</td>
                                <td>{formatBookingDate(booking.endDate)}</td>
                                <td>{userBooking[booking.employeeId] ? `${user[booking.customerId].firstName} ${user[booking.customerId].lastName}` : 'Loading......'}</td>
                                <td>{capitalizeFirstLetter(booking.status)}</td>
                                <td>
                                    <IconTipName Icon={FcSearch} size={30} name="Details" onClick={() => handleBookingDetails(booking._id)} />
                                </td>
                                <td>
                                    <IconTipName Icon={AiTwotoneDelete} size={30} name="Delete" onClick={() => showDeleteModal(booking._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
            <br /><br /><br /><br /><br /><br /><br /><br />
            {/* Delete modal */}
            <Modal show={showModalD} onHide={() => setShowModalD(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete subscription?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete this subscription? It will delete all services booked.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <br />
        </>
    );
}

export default Subscription
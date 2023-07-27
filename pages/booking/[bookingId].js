
import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Image, Alert, Col, Card, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
// import { useAtom } from "jotai";
// import { bookingInfoAtom } from "../../store";
import { useForm } from "react-hook-form";
import { getBookingById, updateBookingById } from "../../lib/booking";
import { formatBookingDate, capitalizeFirstLetter, formatDateToISO, disableCapitalizeFirstLetter } from "../../components/CommonFunction";
import { getUsersByRole } from "../../lib/user";

const BookingDetails = () => {
    const router = useRouter();
    const { bookingId } = router.query;
    const source = sessionStorage.getItem("source"); //get the session 

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    // const serviceTypeInfo = watch("serviceType"); // Get the selected serviceType from the form state

    //global variable defined in store.js
    // const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);

    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [bookingIdInfo, setBookingIdInfo] = useState([]);
    const [employeeUsers, setEmployeeUsers] = useState([]);
    // const [hasResidence, setHasResidence] = useState(false);

    //Booking data
    useEffect(() => {
        //retrieve residence information when component mounts
        if (bookingId) {

            async function fetchBookingId() {
                try {
                    //calls API GET: booking by id
                    const data = await getBookingById(bookingId);
                    setBookingIdInfo(data.bookings);

                    //set the value retrieve from API to variables to show to user
                    setValue("_id", data.bookings._id);
                    setValue("customerId", data.bookings.customerId);
                    setValue("employeeId", data.bookings.employeeId);
                    setValue("status", capitalizeFirstLetter(data.bookings.status));
                    setValue("serviceType", data.bookings.serviceType);
                    setValue("frequency", data.bookings.frequency);
                    setValue("startDate", formatBookingDate(data.bookings.startDate));
                    setValue("endDate", formatBookingDate(data.bookings.endDate));
                    setValue("specification", capitalizeFirstLetter(data.bookings.specification));
                }
                catch (err) {
                    console.error("Error fetching bookings: ", err);
                }
            }
            fetchBookingId();
        }
    }, [bookingId]);

    //Customer and Employee data
    // useEffect(() => {
    //     //retrieve customer information when component mounts
    //     async function fetchUserBooking() {
    //         try {
    //             //get all userIds that exist in booking
    //             const userIds = Array.from(new Set(bookingIdInfo.map(booking => [bookingIdInfo.customerId, bookingIdInfo.employeeId]).flat()));

    //             //call API GET: user by id (user?id=)
    //             const userInfo = userIds.map(userId => getUserById(userId));
    //             const userData = await Promise.all(userInfo);

    //             //convert to Object and make _id as Key
    //             const userObj = userData.reduce((acc, user) => {
    //                 acc[user._id] = user;
    //                 return acc;
    //             }, {});

    //             setUserBooking(userObj);
    //         }
    //         catch (err) {
    //             console.error("Error fetching user information: ", err);
    //         }
    //     }

    //     fetchUserBooking();
    // }, [bookingIdInfo])

    //Get list of Employee
    useEffect(() => {
        async function fetchEmployeeUsers() {
            try {
                //calls API GET: users by role
                const data = await getUsersByRole("employee");
                setEmployeeUsers(data.users);
            }
            catch (err) {
                console.error("Error fetching employee users: ", err);
            }
        }
        fetchEmployeeUsers();
    }, [])

    const handleRedirect = () => {
        //if manager go back to previous page
        source === "managerS" ? router.push("/subscription") : router.push("/userHome");

        //clear the session storage value
        sessionStorage.removeItem(source);
    }

    async function submitForm(data) {
        //set the new info in a new variable
        const startDate = formatDateToISO(data.startDate);
        const endDate = formatDateToISO(data.endDate);
        const status = disableCapitalizeFirstLetter(data.status);

        const updateBookingInfo = {
            bookingId: data._id,
            employeeId: data.employeeId,
            status: status,
            serviceType: data.serviceType,
            frequency: data.frequency,
            startDate: startDate,
            endDate: endDate,
            specification: data.specification,
        }
        try {
            //call api to store info
            const res = await updateBookingById(updateBookingInfo);
            //show modal with update result
            setResModal(res);
            setShowModal(true);


        } catch (err) { console.log(err); }
    }

    return (
        <>
            <Container className="flex">
                <Row className="flex">
                    <Image src="/residence-2.jpg" style={{ height: "10%", width: "105%" }} />
                </Row>
                <br />
                <Row>
                    <p style={{ fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}>  Subscription Number: {bookingId} </p>
                </Row>
                <br />
                <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
                    <Row className="mb-6">
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Customer </Form.Label>
                            <Form.Control className={errors.customerId && "inputErrors"} {...register("customerId")}
                                type="text"
                                id="customerId"
                                name="customerId"
                                disabled="true" />
                            <br />
                        </Form.Group>
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Status </Form.Label>
                            <Form.Control className={errors.status && "inputErrors"} {...register("status")}
                                type="text"
                                id="status"
                                name="status"
                                disabled="true" />
                            <br />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Service Type</Form.Label>
                            <Form.Select className={errors.serviceType && "inputErrors"} {...register("serviceType", { required: true })}
                                id="serviceType"
                                name="serviceType">
                                <option value="">Select the service type...</option>
                                <option value="casual"> Casual</option>
                                <option value="deep"> Deep</option>
                                <option value="green"> Green </option>
                            </Form.Select>
                            <br />
                            {errors.serviceType?.type === "required" && (<Alert variant="danger">Service Type is required</Alert>)}
                        </Form.Group>
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Frequency</Form.Label>
                            <Form.Select className={errors.frequency && "inputErrors"} {...register("frequency", { required: true, })}
                                id="frequency"
                                name="frequency" >
                                <option value="">Select the frenquecy...</option>
                                <option value="once"> Once</option>
                                <option value="weekly"> Weekly</option>
                                <option value="bi-weekly"> Bi-Weekly </option>
                                <option value="monthly"> Monthly </option>
                            </Form.Select>
                            <br />
                            {errors.frequency?.type === "required" && (<Alert variant="danger">City is required</Alert>)}
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-6">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control className={errors.startDate && "inputErrors"} {...register("startDate", { required: true, })}
                                type="text"
                                id="startDate"
                                name="startDate" />
                            <br />
                            {errors.startDate?.type === "required" && (<Alert variant="danger">City is required</Alert>)}
                        </Form.Group>
                        <Form.Group className="col col-sm-6">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control className={errors.endDate && "inputErrors"} {...register("endDate", { required: true, })}
                                type="text"
                                id="endDate"
                                name="endDate" />
                            <br />
                            {errors.endDate?.type === "required" && (<Alert variant="danger">City is required</Alert>)}
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group className="col col-sm-12">
                            <Form.Label>Employee </Form.Label>
                            <Form.Select className={errors.employeeId && "inputErrors"} {...register("employeeId")}
                                id="employeeId"
                                name="employeeId">
                                <option value="">Select an employee...</option>
                                {employeeUsers.map((employee) => (
                                    // Render options for each employee
                                    <option key={employee._id} value={employee._id}>
                                        {`${employee.firstName} ${employee.lastName}`}
                                    </option>
                                ))}
                            </Form.Select>
                            <br />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row>
                        <Form.Group className="col col-sm-12">
                            <Form.Label>Customer Specification </Form.Label>
                            <Form.Control className={errors.specification && "inputErrors"} {...register("specification")}
                                type="text"
                                id="specification"
                                name="specification" />
                            <br />
                        </Form.Group>
                    </Row>
                    <br /><br />

                    <Row >
                        <br />
                        <Col className="col col-sm-3">
                            <Button variant="primary"
                                className="btn btn-outline-info"
                                type="submit"
                                onClick={handleRedirect}
                                style={{ padding: "15px", margin: "1px", width: "50%" }}> Back</Button>
                        </Col>
                        <Col className="col col-sm-3">
                            <Button variant="primary"
                                className="btn btn-outline-success"
                                type="submit"
                                disable={Object.keys(errors).length > 0}
                                style={{ padding: "15px", margin: "1px", width: "50%" }}>Save</Button>
                        </Col>
                    </Row>
                </Form>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* update residence information */}
                        {resModal && resModal.status === "ok" ? (<p>The booking information has been successfully updated.</p>)
                            : (<p>Something wrong happened, please try again later</p>)
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default BookingDetails

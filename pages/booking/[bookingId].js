
import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Image, Alert, Col, Card, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { bookingInfoAtom } from "../../store";
import { useForm } from "react-hook-form";
import { getBookingById } from "../../lib/booking";

const BookingDetails = () => {
    //get the session 
    const source = sessionStorage.getItem("source");

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const router = useRouter();
    const { bookingId } = router.query;

    //global variable defined in store.js
    const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);

    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [hasResidence, setHasResidence] = useState(false);

    useEffect(() => {
        console.log(bookingId);
        if (bookingId) {
            //retrieve booking information when the component mounts
            async function fetchBookingId() {
                const data = await getBookingById(bookingId);

                console.log(data.bookings.status);

                //if GET: residence retrieves data set it in residenceInfo and form variables
                if (data !== null) {
                    setBookingInfo({
                        _id: data.bookings._id,
                        employeeId: data.bookings.employeeId,
                        customerId: data.bookings.customerId,
                        residenceId: data.bookings.residenceId,
                        status: data.bookings.status,
                        serviceType: data.bookings.serviceType,
                        frequency: data.bookings.frequency,
                        startDate: data.bookings.startDate,
                        endDate: data.bookings.endDate,
                        specification: data.bookings.specification,
                    });
                    //set the value retrieve from API to variables to show to user
                    setValue("_id", data.bookings._id);
                    setValue("customerId", data.bookings.customerId);
                    setValue("employeeId", data.bookings.employeeId);
                    setValue("status", data.bookings.status);
                    setValue("serviceType", data.bookings.serviceType);
                    setValue("frequency", data.bookings.frequency);
                    setValue("startDate", formattedBookingDate(data.bookings.startDate));
                    setValue("endDate", formattedBookingDate(data.bookings.startDate));
                    setValue("specification", data.bookings.specification);


                }
            }

            fetchBookingId();
        }
    }, [bookingId]);

    const handleRedirect = () => {
        //if manager go back to previous page
        source === "managerS" ? router.push("/subscription") : router.push("/userHome");

        //clear the session storage value
        sessionStorage.removeItem(source);
    }

    const formattedBookingDate = (date) =>{
        const formattedData = new Date(date).toISOString("en-GB");
        return formattedData 
    }

    async function submitForm(data) {
        //set the new info in a new variable
        const updateBookingInfo = {
            employeeId: data.bookings.employeeId,
            status: data.status,
            serviceType: data.serviceType,
            frequency: data.frequency,
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString(),
            specification: data.specification,
        }

        //update the jotai
        await setBookingInfo(updateBookingInfo);


        try {
            //call api to store info
            await updateBookingById(updateBookingInfo);
            // router.push(/result);

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
                    <p style={{ fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}>  Subscription id: {bookingId} </p>
                </Row>
                <br />
                <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
                    <Row className="mb-6">
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Customer </Form.Label>
                            <Form.Control className={errors.customerId && "inputErrors"} {...register("customerId", { minLength: 1, maxLength: 150 })}
                                type="text"
                                id="customerId"
                                name="customerId"
                                disabled="true" />
                            <br />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Service Type</Form.Label>
                            <Form.Control className={errors.serviceType && "inputErrors"} {...register("serviceType", { required: true, pattern: /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/, })}
                                type="text"
                                id="serviceType"
                                name="serviceType" />
                            <br />
                            {errors.serviceType?.type === "pattern" && (<Alert variant="danger">Postal Code is not correct </Alert>)}
                            {errors.serviceType?.type === "required" && (<Alert variant="danger">Postal Code is required</Alert>)}
                        </Form.Group>
                        <Form.Group className="col col-sm-6">
                            <Form.Label> Frequency</Form.Label>
                            <Form.Control className={errors.frequency && "inputErrors"} {...register("frequency", { required: true, })}
                                type="text"
                                id="frequency"
                                name="frequency" />
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
                            <Form.Control className={errors.employeeId && "inputErrors"} {...register("employeeId", { required: true, })}
                                type="text"
                                id="employeeId"
                                name="employeeId" />
                            <br />
                            {errors.employeeId?.type === "required" && (<Alert variant="danger">City is required</Alert>)}
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
                        <Modal.Title>Residence Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* update residence information */}
                        {resModal && resModal.status === "ok" ? (<p>Your residence information has been successfully updated.</p>)
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

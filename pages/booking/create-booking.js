
import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Alert, Col, Card, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { registerBookingByCustomer, } from "../../lib/booking";
import { getUserInfo, getUsersByRole } from "../../lib/user";
import { getResidenceByCustomerId } from "../../lib/residence";
import { formatDateToISO } from "../../components/CommonFunction";
import { useAtom } from "jotai";
import { residenceInfoAtom, userInfoAtom } from "../../store"

const CreateBooking = () => {
    const router = useRouter()
    const source = sessionStorage.getItem("source"); //get the session 

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    //global variable defined in store.js
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    // const [bookingInfo, setBookingInfo] = useAtom(bookingInfoAtom);

    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [employeeUsers, setEmployeeUsers] = useState([]);
    const [customerUsers, setCustomerUsers] = useState([]);
    const [selectService, setSelectService] = useState();
    const [hasResidence, setHasResidence] = useState(true);
    const [residenceId, setResidenceId] = useState();
    const [userRole, setUserRole] = useState();

    //User logged in data, if manager it needs show list of customer and employee, if not check if customer has residence
    useEffect(() => {
        //retrieve user information
        async function fetchUserInfo() {
            try {
                const data = await getUserInfo();
                if (data) {
                    setUserInfo({
                        username: data.user.username,
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        role: data.user.role,
                        userId: data.user._id,
                    })
                }
                //check if user is manager to show employee/customer information
                setUserRole(userInfo.role);

                //store userId if customer to pass in JSON
                if (userRole === "customer") {
                    setValue("customerId", userInfo.userId);

                    //check if customer user has residence
                    const residence = await getResidenceByCustomerId(userInfo.userId);

                    if (!residence) {
                        setHasResidence(false);
                    }
                    else {
                        setResidenceId(residence.residence._id);
                    }
                }
            }
            catch (err) {
                console.error("Error fetching user: ", err);
            }
        }
        fetchUserInfo();
    }, []);

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
    }, []);

    //Get list of Customer
    useEffect(() => {
        async function fetchCustomerUsers() {
            try {
                //calls API GET: users by role
                const data = await getUsersByRole("customer");
                setCustomerUsers(data.users);
            }
            catch (err) {
                console.error("Error fetching customer users: ", err);
            }
        }
        fetchCustomerUsers();
    }, []);

    //set selected customer to check if they have residence
    const handleSelectCustomer = async (customerId) => {
        setValue("customerId", customerId);

        try {
            const residence = await getResidenceByCustomerId(customerId);

            if (residence) {
                setHasResidence(true);
                setResidenceId(residence.residence._id);
            }
            else { setHasResidence(false); }

        }
        catch (err) {
            console.error("Error to retrieve residence info: ", err);
        }
    }
    const handleServiceType = (option) => {
        setSelectService(option);
        console.log(selectService);
    };

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

        const updateBookingInfo = {
            customerId: data.customerId,
            employeeId: data.employeeId,
            residenceId: residenceId,
            status: "ongoing",
            serviceType: selectService,
            frequency: data.frequency,
            startDate: startDate,
            endDate: endDate,
            specification: data.specification,
        }
        try {
            //call api to store info
            const res = await registerBookingByCustomer(updateBookingInfo);

            //show modal with update result
            setResModal(res);
            setShowModal(true);
            setValue("customerId", "");
            setValue("startDate", "");
            setValue("endDate", "");
            setValue("frequency", "");
            setValue("serviceType", "");
            setValue("employeeId", "");
            setValue("specification", "");

        } catch (err) { console.log(err); }
    }

    return (
        <>
            <Container className="flex">
                <br />
                <Row>
                    <p style={{ fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}>  Register a booking  </p>

                </Row>
                <br />
                <br />
                <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
                    <Row className="mb-6">
                        {userRole === "manager" && (
                            <Form.Group className="col col-sm-12">
                                <Form.Label> Full Name </Form.Label>
                                <Form.Select className={errors.customerId && "inputErrors"} {...register("customerId")}
                                    type="text"
                                    id="customerId"
                                    name="customerId"
                                    onChange={(e) => handleSelectCustomer(e.target.value)} >
                                    <option value="">Select an customer...</option>
                                    {customerUsers.map((customer) => (
                                        // Render options for each employee
                                        <option key={customer._id} value={customer._id}>
                                            {`${customer.firstName} ${customer.lastName}`}
                                        </option>
                                    ))}
                                </Form.Select>
                                <br />
                            </Form.Group >)}
                    </Row>
                    {!hasResidence && (<Alert variant="danger">The customer selected doesn't have residence, please proceed to crate customer's residence before continue create their booking</Alert>)}
                    <br />
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-4">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control className={errors.startDate && "inputErrors"} {...register("startDate", { required: true, pattern: "\d{2}.\d{2}.\d{4}" })}
                                type="text"
                                id="startDate"
                                name="startDate"
                                placeholder="Enter a date as DD.MM.AAAA (31.07.2023)" />
                            <br />
                            {errors.startDate?.type === "required" && (<Alert variant="danger">Start Date is required</Alert>)}
                            {errors.startDate?.type === "pattern" && (<Alert variant="danger"> Please, enter date in the correct format</Alert>)}
                        </Form.Group>
                        <Form.Group className="col col-sm-4">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control className={errors.endDate && "inputErrors"} {...register("endDate", { required: true, pattern: "\d{2}.\d{2}.\d{4}" })}
                                type="text"
                                id="endDate"
                                name="endDate"
                                placeholder="Enter a date as DD.MM.AAAA (31.07.2023)" />
                            <br />
                            {errors.endDate?.type === "required" && (<Alert variant="danger">End Date is required</Alert>)}
                            {errors.endDate?.type === "pattern" && (<Alert variant="danger"> Please, enter date in the correct format</Alert>)}
                        </Form.Group>
                        <Form.Group className="col col-sm-4">
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
                            {errors.frequency?.type === "required" && (<Alert variant="danger">Frequency is required</Alert>)}
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="flex">
                        <Col>
                            <Card id="home-products" style={{ width: '25rem' }}>
                                <Card.Img src="/home-products.jpg" style={{ width: '100%' }} />
                                <Card.Body>
                                    <Form.Check style={{ fontSize: "1.5rem" }}
                                        type="radio"
                                        label="Green Cleaning"
                                        name="green"
                                        value="green"
                                        checked={selectService === "green"}
                                        onChange={() => handleServiceType("green")} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="home-booking" style={{ width: '25rem' }}>
                                <Card.Img src="/home-search.jpg" style={{ width: '100%' }} />
                                <Card.Body>
                                    <Form.Check style={{ fontSize: "1.5rem" }}
                                        type="radio"
                                        label="Casual Cleaning"
                                        name="casual"
                                        value="casual"
                                        checked={selectService === "casual"}
                                        onChange={() => handleServiceType("casual")} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="home-employees" style={{ width: '25rem' }}>
                                <Card.Img src="/home-employees.jpg" style={{ width: '100%' }} />
                                <Card.Body>
                                    <Form.Check style={{ fontSize: "1.5rem" }}
                                        type="radio"
                                        label="Deep Cleaning"
                                        name="deep"
                                        value="deep"
                                        checked={selectService === "deep"}
                                        onChange={() => handleServiceType("deep")} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    {/* if manager show employee list */}
                    {userRole === "manager" && (
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
                            <br />
                        </Row>
                    )}
                    <Row>
                        <Form.Group className="col col-sm-12">
                            <Form.Label>Customer Specification </Form.Label>
                            <Form.Control className={errors.specification && "inputErrors"} {...register("specification")}
                                as="textarea"
                                id="specification"
                                name="specification" />
                            <br />
                        </Form.Group>
                    </Row>
                    <br /><br />

                    <Row style={{ marginLeft: "200px" }}>
                        <br />
                        <Col className="col col-sm-6">
                            <Button variant="primary"
                                className="btn btn-outline-info"
                                type="submit"
                                onClick={handleRedirect}
                                style={{ marginLeft: "100px", padding: "15px", margin: "1px", width: "50%" }}> Back</Button>
                        </Col>
                        <Col className="col col-sm-6">
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
                        <Modal.Title>Registered Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* update residence information */}
                        {resModal ? (<p>A new booking was added to user</p>)
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

export default CreateBooking

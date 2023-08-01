import React, { useState, useEffect } from "react";
import { isAuthenticated, registerUser } from "../lib/authenticate";
import { Form, Row, Button, Card, Alert, Col, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import Link from "next/link";

const RegisterPage = () => {
    const source = sessionStorage.getItem("source"); //get the session
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);     // Add this at the top of the Login component
    const [isManager, setIsManager] = useState(false);

    //control form information
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const password = watch('password');
    const password2 = watch('password2');

    //global variable defined in store.js
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    useEffect(() => {
        //get if the user logged in is a manager or not
        setIsManager(userInfo.role === "manager" ? true : false);
    });

    //hit Back button
    const handleRedirect = () => {
        //if manager go back to previous page
        if (source === "managerC") {
            //clear the session storage value
            sessionStorage.removeItem('source');
            router.push("/employee/customer")
        }
        else if (source === "managerE") {
            //clear the session storage value
            sessionStorage.removeItem('source');
            router.push("/employee/employee")
        }
        else {
            //clear the session storage value
            sessionStorage.removeItem('source');
            router.push("/login");
        }
    }

    //update residence information
    async function submitForm(data) {
        const userData = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            password2: data.password2,
            role: data.role || "customer"
        };
        //set user info
        await setUserInfo(userData.username, userData.firstName, userData.lastName, userData.email, userData.phone, userData.role);

        //call customer API to create a user
        try {
            const res = await registerUser(userData);

            //show modal and login to webpage
            setResModal(res);
            setShowModal(true);
        }
        catch (err) {
            if (err.message === "500") {
                setErrorMessage("The username already exist. Please try another one");
            } else if (typeof err === "object" && err.message) {
                setErrorMessage(err.message);
            }
            else {
                setErrorMessage("An unknown error occurred.")
            }
        }
    }

    return (
        <>
            <Card bg="info" className="container mt-3 mb-3">
                <Card.Body lassName="col col-sm-9">
                    <h2 style={{ color: '#f0f5fa', justifyItems: "center", alignItems: "center" }}>Create an Account</h2>
                    <p style={{ color: '#f0f5fa', fontSize: "1.5rem" }}>Please fill all required field to create an account in our website</p></Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3" style={{ paddingLeft: "10%" }}>
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>User</Form.Label>
                        <Form.Control className={errors.username && "inputErrors"}{...register("username", { required: true, minLength: 5 })}
                            type="text"
                            id="username"
                            name="username" />
                        <br />
                        {errors.username?.type === "required" && (<Alert variant="danger">User Name is required</Alert>)}
                        {errors.username?.type === "minLength" && (<Alert variant="danger">User Name must have at least 5 character </Alert>)}
                    </Form.Group>
                </Row>
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className={errors.firstName && "inputErrors"}{...register("firstName", { required: true, minLength: 3, maxLength: 50 })}
                            type="text"
                            id="firstName"
                            name="firstName" />
                        {errors.firstName?.type === "required" && (<Alert variant="danger">First Name is required</Alert>)}
                        {errors.firstName?.type === "minLength" && (<Alert variant="danger">First Name must have at least 3 character </Alert>)}
                        {errors.firstName?.type === "maxLength" && (<Alert variant="danger">First Name must have maximum 50 character</Alert>)}
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className={errors.lastName && "inputErrors"}{...register("lastName", { required: true, maxLength: 100 })}
                            type="text"
                            id="lastName"
                            name="lastName" />
                        {errors.lastName?.type === "required" && (<Alert variant="danger">Last Name is required</Alert>)}
                        {errors.lastName?.type === "maxLength" && (<Alert variant="danger">Last Name must have maximum 100 character</Alert>)}
                    </Form.Group>
                </Row>
                <br />
                {isManager && (
                    <>
                        <Row className="mb-9">
                            <Form.Group className="col col-sm-9">
                                <Form.Label>User View</Form.Label>
                                <Form.Select className={errors.role && "inputErrors"} {...register("role", { required: true })} >
                                    <option value="">Select</option>
                                    <option value="customer">Customer</option>
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                </Form.Select>
                                <br />
                                {errors.role && errors.role === "required" && (<Alert variant="danger">User view is required</Alert>)}
                            </Form.Group>
                        </Row>
                    </>)}
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className={errors.email && "inputErrors"}{...register("email", {
                            required: true, minLength: 5,
                            pattern: {
                                value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                message: "Please enter a valid email address",
                            },
                        })}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter you email address" />
                        {errors.email?.type === "required" && (<Alert variant="danger">Email is required</Alert>)}
                        {errors.email?.type === "minLength" && (<Alert variant="danger">Email must contains at least 5 character</Alert>)}
                        {errors.email?.type === "pattern" && (<Alert variant="danger">{errors.email.message}</Alert>)}
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control className={errors.phone && "inputErrors"}{...register("phone", {
                            required: true,
                            pattern: {
                                value: /^(\+?1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/,
                                message: "Please enter a valid telephone number",
                            },
                        })}
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter the telephone number (ex. 111-222-3333)" />
                        {errors.phone?.type === "required" && (<Alert variant="danger">Telephone is required</Alert>)}
                        {errors.phone?.type === "pattern" && (<Alert variant="danger">{errors.phone.message}</Alert>)}
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={errors.password && "inputErrors"}{...register("password", { minLength: 5 })}
                            type="password"
                            id="password"
                            name="password" />
                        {errors.password?.type === "minLength" && (<Alert variant="danger">Password must have minimum 5 character</Alert>)}
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className={errors.password2 && "inputErrors"}{...register("password2", { validate: (value) => value === password, })}
                            type="password"
                            id="password2"
                            name="password2" />
                        {errors.password2?.type === "validate" && (<Alert variant="danger">Password do not match</Alert>)}
                    </Form.Group>
                </Row>
                <br />
                {errorMessage && (<Row className="col col-sm-9" ><Alert variant="danger"> {errorMessage} </Alert></Row>)}
                <Row className="mb-3" style={{ padding: "10px" }}>
                    <br />
                    <Col>
                        <Button variant="primary"
                            className="btn btn-outline-info"
                            // type="submit"
                            onClick={handleRedirect}
                            style={{ padding: "10px", margin: "1px", width: "40%" }}> Back</Button>
                    </Col>
                    <Col>
                        <Button variant="primary"
                            className="btn btn-outline-success"
                            type="submit"

                            style={{ padding: "10px", margin: "1px", width: "40%" }}>Save</Button>
                    </Col>
                </Row>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile created</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resModal && (<p>Your profile has been successfully created.</p>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { setShowModal(false); handleRedirect(); }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterPage
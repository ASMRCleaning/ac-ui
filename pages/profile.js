import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Form, Alert, Button, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import { getUserInfo, updateUserInfo } from "../lib/user";
import { useRouter } from "next/router";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    //global variable defined in store.js
    const [userInfo, setUserInfoAtom] = useAtom(userInfoAtom);

    useEffect(() => {
        //retrieve residence information when component mounts
        async function fetchCustomer() {
            //calls API GET: customer 
            const data = await getUserInfo();

            //set info to jotai
            setUserInfoAtom({
                username: data.user.username,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
                phone: data.user.phone,
                role: data.user.role,
            });
            setValue("firstName", data.user.firstName);
            setValue("lastName", data.user.lastName);
            setValue("email", data.user.email);
            setValue("phone", data.user.phone);
        }
        fetchCustomer();
    }, []);

    const handleRedirect = () => {
        if (userInfo.role === "customer") {
            //clear the session storage value
            sessionStorage.removeItem('source');
            return router.push("/customer/userHome")
        }
        else {
            //clear the session storage value
            sessionStorage.removeItem('source');
            return router.push("/employee/userHome")
        }
    }

    async function submitForm(data) {
        const updateCustomer = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
        };

        //update jotai customer object
        await setUserInfoAtom(updateCustomer);

        //call customer API to stores info
        try {
            const res = await updateUserInfo(updateCustomer);

            //show modal with update result
            setResModal(res);
            setShowModal(true);
        }
        catch (err) {
            setErrorMessage("Something went wrong while update user. Please try again later.");
            console.error("Error to update user: ", err);
        }
    }

    return (
        <>
            <Container className="flex">
                <Row className="flex">
                    <Image src="/userHome-2.jpg" style={{ paddingBottom: "10px", height: "200%", width: "300%" }} />
                </Row>
                <br />
                <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3" style={{ paddingLeft: "10%" }}>
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-9">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text"
                                id="user"
                                name="user"
                                value={userInfo.username}
                                disabled="true" />
                        </Form.Group>
                    </Row>
                    {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
                    <br />
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
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-9">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={errors.email && "inputErrors"}{...register("email", { required: true, maxLength: 100 })}
                                type="text"
                                id="email"
                                name="email" />
                            {errors.email?.type === "required" && (<Alert variant="danger">Email is required</Alert>)}
                            {errors.email?.type === "maxLength" && (<Alert variant="danger">Email must have maximum 100 character</Alert>)}
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-9">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control className={errors.phone && "inputErrors"}{...register("phone", { required: true, maxLength: 100 })}
                                type="text"
                                id="phone"
                                name="phone" />
                            {errors.lastName?.type === "required" && (<Alert variant="danger">Phone is required</Alert>)}
                            {errors.lastName?.type === "maxLength" && (<Alert variant="danger">Phone must have maximum 100 character</Alert>)}
                        </Form.Group>
                    </Row>
                    <br /><br />
                    <Row className="mb-3" style={{ padding: "10px" }}>

                        <Col>
                            <Button variant="primary"
                                className="btn btn-outline-info"
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
                        <Modal.Title>Profile Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {resModal && resModal.status === "ok" ? (<p>Your profile has been successfully updated.</p>)
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
    );
}
export default Profile
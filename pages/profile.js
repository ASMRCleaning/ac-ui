import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Form, Alert, Button, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useAtom } from "jotai";
import { customerInfoAtom } from "../store";
import { getCustomerInfo, updateCustomerInfo } from "../lib/customer";
import { useHistory } from "react-router-dom";


const Profile = () => {
    //control form information
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    //global variable defined in store.js
    const [customerInfo, setCustomerInfo] = useAtom(customerInfoAtom);

    // const password = watch('password');
    // const password2 = watch('password2');
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);

    const history = useHistory(); 

    useEffect(() => {
        //retrieve residence information when component mounts
        async function fetchCustomer() {
            //calls API GET: customer 
            const data = await getCustomerInfo();

            //set info to jotai
            setCustomerInfo({
                username: data.user.username,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
            });
            setValue("firstName", data.user.firstName);
            setValue("lastName", data.user.lastName);
        }
        fetchCustomer();
    }, []);


    async function submitForm(data) {
        const updateCustomer = {
            firstName: data.firstName,
            lastName: data.lastName
        };

        //update jotai customer object
        await setCustomerInfo(updateCustomer);

        //call customer API to stores info
        try {
           const res =  await updateCustomerInfo(updateCustomer);

            //show modal with update result
            setResModal(res);
            setShowModal(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    function enableField(e) {
        e.preventDefault();
        setDisable(false)
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
                                value={customerInfo.username}
                                disabled="true" />
                        </Form.Group>
                    </Row>
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
                    {/* <Row className="mb-9">
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
                    </Row> */}
                    <Row className="mb-3" style={{ padding: "10px" }}>
                        <br />
                        <Col>
                            <Button variant="primary"
                                className="btn btn-outline-info"
                                type="submit"
                                // onClick={() => history.push("/userHome")} 
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
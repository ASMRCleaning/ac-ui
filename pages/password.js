import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Form, Alert, Button, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import { getUserInfo, updatePassword } from "../lib/user";
import { useRouter } from "next/router";
import { removeToken } from "../lib/authenticate";

const Password = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const password = watch('password');
    const password2 = watch('password2');
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
        }
        fetchCustomer();
    }, []);

    const handleRedirect = () => {
        if (userInfo.role === "customer") {
            return router.push("/customer/userHome")
        }
        else {
            return router.push("/employee/userHome")
        }
    }
    const handleLogin =() =>{
        removeToken();  //remove token 
        sessionStorage.removeItem('source'); //clear the session storage value, if exists
        router.push("/login");
    }

    async function submitForm(data) {
        const updateCustomer = {
            password: data.password,
            password2: data.password2,
        };
        //call customer API to stores info
        try {
            const res = await updatePassword(updateCustomer);

            //show modal with update result
            setResModal(res);
            setShowModal(true);
        }
        catch (err) {
            setErrorMessage("Something went wrong while update password. Please try again later.");
            console.error("Error update password: ", err);
        }
    }
    return (
        <>
            <Container className="flex">
                <Row className="flex">
                    <Image src="/pass.jpg" style={{ paddingTop: "30px", paddingBottom: "30px", paddingLeft:"70px",  width: "80%" }} />
                </Row>
                <br />
                {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
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
                    <br />
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
                        <Modal.Title>Password Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {resModal && resModal.status === "ok" ? (<p>The password has been successfully updated. <br/> <p>You should be redirect to login page</p></p>)
                            : (<p>Something wrong happened, please try again later</p>)
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {setShowModal(false), handleLogin()}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}
export default Password
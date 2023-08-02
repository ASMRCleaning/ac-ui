
import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Image, Alert, Col, Card, Modal } from "react-bootstrap";
import { useRouter } from 'next/router';
import { registerResidence, getResidence, updateResidence } from "../../lib/residence";
import { useAtom } from "jotai";
import { residenceInfoAtom } from "../../store";
import { useForm } from 'react-hook-form';

const Residence = () => {
    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [hasResidence, setHasResidence] = useState(false);
    const router = useRouter();
    const source = sessionStorage.getItem("source"); //get the session 
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState(null);

    //global variable defined in store.js
    const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

    useEffect(() => {
        //retrieve residence information when the component mounts
        async function fetchResidence() {
            const data = await getResidence();

            //if GET: residence retrieves data set it in residenceInfo and form variables
            if (data) {
                setResidenceInfo({
                    houseType: data.residence.houseType,
                    size: data.residence.size,
                    empty: data.residence.empty,
                    furnished: data.residence.furnished,
                    pet: data.residence.pet,
                    bedroom: data.residence.bedroom,
                    bathroom: data.residence.bathroom,
                    den: data.residence.den,
                    address: {
                        streetAddress: data.residence.address?.streetAddress,
                        unit: data.residence.address?.unit,
                        postalCode: data.residence.address?.postalCode,
                        city: data.residence.address?.city,
                        province: data.residence.address?.province,
                        country: data.residence.address?.country
                    }
                });
                //set the value retrieve from API to variables to show to user
                setValue("streetAddress", data.residence.address?.streetAddress);
                setValue("unit", data.residence.address?.unit);
                setValue("postalCode", data.residence.address?.postalCode);
                setValue("city", data.residence.address?.city);
                setValue("province", data.residence.address?.province);
                setValue("country", data.residence.address?.country);

                //control if user has or not residence to perform edit data or redirect to residence to create a new one
                setHasResidence(true);
            }
        }

        fetchResidence();
    }, []);

    const handleRedirect = () => {
        //if manager go back to previous page
        source === "managerC" ? router.push("/employee/customer") : router.push("/customer/userHome");

        //clear the session storage value
        sessionStorage.removeItem('source');
    }

    const handleRedirectQ = () => {
        router.push("/residence")
    }

    async function submitForm(data) {
        //set the new info in a new variable
        const updateResidenceInfo = {
            ...residenceInfo,
            address: {
                streetAddress: data.streetAddress,
                unit: data.unit,
                postalCode: data.postalCode,
                city: data.city,
                province: data.province,
                country: data.country
            }
        };

        //update the jotai
        await setResidenceInfo(updateResidenceInfo);

        if (!hasResidence) {
            try {
                //call api to store info
                await registerResidence(updateResidenceInfo);
                router.push('/booking/create-booking');

            } catch (err) { 
                setErrorMessage("Something went wrong while add the residence. Please try again later.");
                console.error("Error when adding residence: ", err); 
            }
        }
        //update existing data 
        else {
            try {
                //call api to store info
                const res = await updateResidence(updateResidenceInfo);

                //show modal with update result
                setResModal(res);
                setShowModal(true);

            } 
            catch (err) { 
                setErrorMessage("Something went wrong while update the residence. Please try again later.");
                console.error("Error when updating the residence: ", err); }
        }
    }
    return (
        <>
            <Container className="flex">
                {!hasResidence && !residenceInfo.houseType ?
                    <Row>
                        <Card>
                            <Card.Header>
                                <h3 style={{ textAlign: "center", fontSize: "2.5rem" }}>
                                    Residence Address
                                </h3>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
                                        You do not have residence information, please, click on the button bellow to register your residence
                                    </p>
                                    <Button
                                        variant="outline-success"
                                        onClick={handleRedirectQ}
                                        style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}>
                                        Register your residence here
                                    </Button>
                                </Row>
                                <Row>
                                    <Card.Img variant="top" src="/card-service-1.jpg" style={{ marginTop: "70px", margin: "50px", width: '90%', height: '100%' }} />
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row> :
                    <Container className="flex">
                        <Row className="flex">
                            <Image src="/residence-2.jpg" style={{ height: "10%", width: "105%" }} />
                        </Row>
                        <br />
                            <Row>
                                 <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Residence Address </p>
                            </Row> 
                            {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
                        <br />
                        <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
                            <Row className="mb-6">
                                <Form.Group className="col col-sm-9">
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control className={errors.streetAddress && "inputErrors"}{...register("streetAddress", { required: true })}
                                        type="text"
                                        id="streetAddress"
                                        name="streetAddress"
                                        placeholder="1111, Street Name" />
                                    <br />
                                    {errors.streetAddress?.type === "required" && (<Alert variant="danger">Street Address is required</Alert>)}
                                </Form.Group>
                                <Form.Group className="col col-sm-3">
                                    <Form.Label>Apartment, unit, suite, etc</Form.Label>
                                    <Form.Control className={errors.unit && "inputErrors"} {...register("unit", { minLength: 1, maxLength: 150 })}
                                        type="text"
                                        id="unit"
                                        name="unit"
                                        placeholder="2023" />
                                    <br />
                                    {errors.unit?.type === "minLength" && (<Alert variant="danger">Unit must be more than 5 charater </Alert>)}
                                    {errors.unit?.type === "maxLength" && (<Alert variant="danger">Unit must be less than 150 charater</Alert>)}
                                </Form.Group>
                            </Row>
                            <br />
                            <Row className="mb-9">
                                <Form.Group className="col col-sm-4">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control className={errors.postalCode && "inputErrors"} {...register("postalCode", { required: true, pattern: /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/, })}
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        placeholder="A0B-1C7" />
                                    <br />
                                    {errors.postalCode?.type === "pattern" && (<Alert variant="danger">Postal Code is not correct </Alert>)}
                                    {errors.postalCode?.type === "required" && (<Alert variant="danger">Postal Code is required</Alert>)}
                                </Form.Group>
                                <Form.Group className="col col-sm-8">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control className={errors.city && "inputErrors"} {...register("city", { required: true, })}
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Toronto" />
                                    <br />
                                    {errors.city?.type === "required" && (<Alert variant="danger">City is required</Alert>)}
                                </Form.Group>
                            </Row>
                            <br />
                            <Row className="mb-9">
                                <Form.Group className="col col-sm-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        placeholder="CA - Canada"
                                        disabled="true" />
                                </Form.Group>
                                <Form.Group className="col col-sm-9">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Select className={errors.province && "inputErrors"} {...register("province", { required: true })}>
                                        <option value="">Select</option>
                                        <option value="ON">ON - Ontario</option>
                                        <option value="QC">QB - Quebec</option>
                                        <option value="NS">NS - Nova Scotia</option>
                                        <option value="NB">NB - New Brunswick</option>
                                        <option value="MB">MB - Manitoba</option>
                                        <option value="BC">BC - British Colombia</option>
                                        <option value="PE">PE - Prince Edward Island</option>
                                        <option value="SK">SK - Saskatchewan</option>
                                        <option value="AB">AB - Alberta</option>
                                        <option value="NL">NL - Newfoundland and Labrador</option>
                                    </Form.Select>
                                    <br />
                                    {errors.province && errors.province.type === "required" && (<Alert variant="danger">Province is required</Alert>)}
                                </Form.Group>
                            </Row>
                            <br /><br />

                            <Row >
                                <br />
                                <Col className="col col-sm-3">
                                    <Button variant="primary"
                                        className="btn btn-outline-info"
                                        onClick={handleRedirect}
                                        style={{ padding: "15px", margin: "1px", width: "50%" }}> Back</Button>
                                </Col>
                                {residenceInfo.address?.streetAddress === "" ?
                                    <Col className="col col-sm-3">
                                        <Button variant="primary"
                                            className="btn btn-outline-success"
                                            type="submit"
                                            disable={Object.keys(errors).length > 0}
                                            style={{ padding: "15px", margin: "1px", width: "50%" }}>Submit</Button>
                                    </Col> :
                                    <Col className="col col-sm-3">
                                        <Button variant="primary"
                                            className="btn btn-outline-success"
                                            type="submit"
                                            disable={Object.keys(errors).length > 0}
                                            style={{ padding: "15px", margin: "1px", width: "50%" }}>Save</Button>
                                    </Col>
                                }
                            </Row>
                        </Form>
                    </Container>
                }
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Residence Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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

export default Residence

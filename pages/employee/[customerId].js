import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Form, Alert, Button, Modal, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { residenceInfoAtom, userInfoAtom, viewInfoAtom } from "../../store";
import { useRouter } from "next/router";
import { registerResidenceByCustomerId, getResidenceByCustomerId, updateResidenceByResidenceId, removeResidenceByResidenceId } from "../../lib/residence";

const ResidenceByCustomer = () => {
    //control form information
    const router = useRouter();
    const { customerId } = router.query;
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    //global variable defined in store.js
    const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [viewInfo, setViewInfo] = useAtom(viewInfoAtom)

    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [showModalD, setShowModalD] = useState(false);
    const [hasResidence, setHasResidence] = useState(false);

    useEffect(() => {
        //retrieve residence information when component mounts
        async function fetchResidence() {
            //calls API GET: residence 
            const data = await getResidenceByCustomerId(customerId);

            //if GET: residence retrieves data set it in residenceInfo and form variables
            if (data !== null) {
                //control if user has or not residence to perform edit data or redirect to residence to create a new one
                setHasResidence(true);

                //set info to jotai
                setResidenceInfo({
                    residenceId: data.residence._id,
                    houseType: data.residence.houseType,
                    size: data.residence.size,
                    empty: data.residence.empty,
                    furnished: data.residence.furnished,
                    pet: data.residence.pet,
                    bedroom: data.residence.bedroom,
                    bathroom: data.residence.bathroom,
                    den: data.residence.den,
                    address: {
                        streetAddress: data.residence.address.streetAddress,
                        unit: data.residence.address.unit,
                        postalCode: data.residence.address.postalCode,
                        city: data.residence.address.city,
                        province: data.residence.address.province,
                        country: data.residence.address.country
                    }
                });
                //set the value retrieve from API to variables to show to user
                setValue("houseType", data.residence.houseType);
                setValue("size", data.residence.size);
                setValue("empty", data.residence.empty);
                setValue("furnished", data.residence.furnished);
                setValue("pet", data.residence.pet);
                setValue("bedroom", data.residence.bedroom);
                setValue("bathroom", data.residence.bathroom);
                setValue("den", data.residence.den);
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

    useEffect(() => {

    })

    //hit Back button
    const handleRedirect = () => {
        if (userInfo.role === "customer") {
            //clear the session storage value
            sessionStorage.removeItem('source');
            return router.push("/customer/userHome");
        }
        else {
            //clear the session storage value
            sessionStorage.removeItem('source');
            return router.push("/employee/customer");
        }
    }

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
            await removeResidenceByResidenceId(residenceInfo.residenceId);

            closeDeleteModal()

            // Reset the form fields
            setValue("houseType", "");
            setValue("size", "");
            setValue("empty", false);
            setValue("furnished", false);
            setValue("pet", false);
            setValue("bedroom", "");
            setValue("bathroom", "");
            setValue("den", "");

            // Clear the residenceInfo atom
            setResidenceInfo({});

            // Set hasResidence to false
            setHasResidence(false);
        }

        catch (err) { console.log(err); }
    }

    //update residence information
    async function submitForm(data) {
        const updateResInfo = {
            houseType: data.houseType,
            size: parseInt(data.size),
            empty: data.empty,
            furnished: data.furnished,
            pet: data.pet,
            bedroom: parseInt(data.bedroom),
            bathroom: parseInt(data.bathroom),
            den: parseInt(data.den) || 0,
            address: {
                streetAddress: data?.streetAddress,
                unit: data?.unit,
                postalCode: data?.postalCode,
                city: data?.city,
                province: data?.province,
                country: data?.country
            }
        };
        //update jotai residence object
        await setResidenceInfo(updateResInfo);

        //if does not have residence redirect to residence address to get a quote
        if (!hasResidence) {
            try {
                //call API POST by customerId
                const res = await registerResidenceByCustomerId(updateResInfo, customerId);

                //show modal with update result
                setResModal(res);
                setShowModal(true);
            }
            catch (err) { console.log(err); }
        }
        else {
            try {
                //call API PUT by residenceId
                const res = await updateResidenceByResidenceId(updateResInfo, residenceInfo.residenceId);

                //show modal with update result
                setResModal(res);
                setShowModal(true);
            }
            catch (err) { console.log(err); }
        }
    }

    return (
        <>
            {viewInfo === 0 && (
                <Container className="flex">
                    <Row>
                        <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Residence Information
                            <br />
                        </p>
                    </Row>
                    <Row>
                        <Col className="col col-sm-3" style={{ paddingTop: "40px" }}>
                            <Image src="/residence_1.jpg" style={{ height: "85%", width: "130%" }} />
                        </Col>
                        <Col className="col col-sm-9" style={{ paddingLeft: "100px" }}>
                            <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>Choose your house type:</Form.Label>
                                        <Form.Select className={errors.houseType && "inputErrors"} {...register("houseType", { required: true })}>
                                            <option value="">Select</option>
                                            <option value="apartment">Apartment</option>
                                            <option value="condo">Condo</option>
                                            <option value="house">House</option>
                                        </Form.Select>
                                        <br />
                                        {errors.houseType && errors.houseType.type === "required" && (<Alert variant="danger">House Type is required</Alert>)}
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>Enter your house length: </Form.Label>
                                        <Form.Control className={errors.size && "inputErrors"} {...register("size", { required: true, min: 100, max: 2000 })}
                                            type="text"
                                            id="size"
                                            name="size"
                                            placeholder="Enter just the length without the unit of measure (ex.: 1400)" />
                                        <br />
                                        {errors.size?.type === "required" && (<Alert variant="danger">Size is required</Alert>)}
                                        {errors.size?.type === "min" && (<Alert variant="danger">Size must be greater than 100</Alert>)}
                                        {errors.size?.type === "max" && (<Alert variant="danger">Size must be less than 2000</Alert>)}
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>The residence is empty? </Form.Label>
                                        <Form.Check className={errors.empty && "inputErrors"} {...register("empty")}
                                            type="switch"
                                            id="empty"
                                            label="Empty" />
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>Is it furnished? </Form.Label>
                                        <Form.Check  {...register("furnished",)}
                                            type="switch"
                                            id="furnished"
                                            label="Has one or more item in that" />
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>The residence has any pet? </Form.Label>
                                        <Form.Check  {...register("pet")}
                                            type="switch"
                                            id="pet"
                                            label="Contain a Pet" />
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>How many bedrooms it has? </Form.Label>
                                        <Form.Control className={errors.bedroom && "inputErrors"}  {...register("bedroom", { required: true, min: 1, max: 10 })}
                                            type="text"
                                            id="bedroom"
                                            placeholder="Enter a number between 1 to 10" />
                                        <br />
                                        {errors.bedroom?.type === "required" && (<Alert variant="danger">Bedroom is required</Alert>)}
                                        {errors.bedroom?.type === "min" && (<Alert variant="danger">Bedroom must be greater than or equal 1</Alert>)}
                                        {errors.bedroom?.type === "max" && (<Alert variant="danger">Bedroom must be less than or equal 10</Alert>)}
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>How many bathroom it has? </Form.Label>
                                        <Form.Control className={errors.bathroom && "inputErrors"} {...register("bathroom", { required: true, min: 1, max: 10 })}
                                            type="text"
                                            id="bathroom"
                                            placeholder="Enter a number between 1 to 10" />
                                        <br />
                                        {errors.bathroom?.type === "required" && (<Alert variant="danger">Bathroom is required</Alert>)}
                                        {errors.bathroom?.type === "min" && (<Alert variant="danger">Bathroom must be greater than or equal 1</Alert>)}
                                        {errors.bathroom?.type === "max" && (<Alert variant="danger">Bathroom must be less than or equal 10</Alert>)}
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className="mb-6">
                                    <Form.Group className="col col-sm-9">
                                        <Form.Label>How many dens or small offices it has? </Form.Label>
                                        <Form.Control className={errors.den && "inputErrors"}{...register("den", { max: 10 })}
                                            type="text"
                                            id="den"
                                            placeholder="Optional information" />
                                        <br />
                                        {errors.den?.type === "max" && (<Alert variant="danger">Den/Office must be less than or equal 10</Alert>)}
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row >
                                    <br />
                                    <Col className="col col-sm-3">
                                        <Button variant="primary"
                                            className="btn btn-outline-info"
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
                                    {!hasResidence ? "" :
                                        <Col className="col col-sm-3">
                                            <Button variant="danger"
                                                className="btn btn-outline-danger"
                                                onClick={showDeleteModal}
                                                style={{ padding: "15px", margin: "1px", width: "50%" }}>Delete</Button>
                                        </Col>
                                    }
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>)}
            {viewInfo === 1 && (<>
                {!hasResidence ?
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
                                        Customer does not have a residence entry information. Please entry their residence information first, and then add an address
                                    </p>
                                    <Col style={{ paddingLeft: "550px" }} className="col col-sm-9">
                                        <Button variant="primary"
                                            className="btn btn-outline-info"
                                            onClick={handleRedirect}
                                            style={{ padding: "15px", margin: "1px", width: "50%" }}> Back</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Card.Img variant="top" src="/card-service-1.jpg" style={{ marginTop: "70px", margin: "50px", width: '90%', height: '100%' }} />
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                    :

                    <Container className="flex">
                        <Container className="flex">
                            <Row className="flex">
                                <Image src="/residence-2.jpg" style={{ height: "10%", width: "105%" }} />
                            </Row>
                            <br />
                            <Row>
                                <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Residence Address </p>
                            </Row>
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
                                            // type="submit"
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
                        </Container>
                    </Container>
                } </>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Residence Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* update residence information */}
                    {resModal && resModal.status === "ok" ? (<p>Customer residence information has been successfully updated.</p>)
                        : (<p>Something wrong happened, please try again later</p>)
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete modal */}
            <Modal show={showModalD} onHide={() => setShowModalD(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete residence information?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete you residence information?
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
        </>

    );
}
export default ResidenceByCustomer
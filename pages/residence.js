import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Form, Alert, Button, Modal, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { residenceInfoAtom } from "../store";
import { useRouter } from "next/router";
import { getResidence, removeResidence, updateResidence } from "../lib/residence";

const Residence = () => {
    //control form information
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    //global variable defined in store.js
    const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);
    const [showModalD, setShowModalD] = useState(false);
    const [hasResidence, setHasResidence] = useState(false);

    const router = useRouter();

    useEffect(() => {
        //retrieve residence information when component mounts
        async function fetchResidence() {
            //calls API GET: residence 
            const data = await getResidence();

            //if GET: residence retrieves data set it in residenceInfo and form variables
            if (data !== null) {
                //set info to jotai
                setResidenceInfo({
                    houseType: data.residence.houseType,
                    size: data.residence.size,
                    empty: data.residence.empty,
                    furnished: data.residence.furnished,
                    pet: data.residence.pet,
                    bedroom: data.residence.bedroom,
                    bathroom: data.residence.bathroom,
                    den: data.residence.den,
                    frequency: data.residence.frequency
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
                setValue("frequency", data.residence.frequency);

                //control if user has or not residence to perform edit data or redirect to residence to create a new one
                setHasResidence(true);
            }
        }
        fetchResidence();
    }, []);

    //hit Back button
    const handleRedirect = () => {
        router.push("/userHome")
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
            await removeResidence();

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
            setValue("frequency", "");

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
            frequency: data.frequency
        };
        //update jotai residence object
        await setResidenceInfo(updateResInfo);

        //if does not have residence redirect to residence address to get a quote
        if (!hasResidence) {
            router.push("residenceAddress")
        }
        else {
            //call customer API to stores info
            try {
                const res = await updateResidence(updateResInfo);

                //show modal with update result
                setResModal(res);
                setShowModal(true);
            }
            catch (err) { console.log(err); }
        }
    }

    return (
        <>
            <Container className="flex">
                <Row>
                    <p style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: "center" }}>  Residence Information
                        <br />
                        {!hasResidence && (
                            <Alert style={{ fontSize: '1.5rem', textAlign: "center" }}>
                                You do not have information, please fill the form below to have a quote
                            </Alert>)}
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
                            <Row className="mb-6">
                                <Form.Group className="col col-sm-9">
                                    <Form.Label>How often do you want the cleaning service?</Form.Label>
                                    <Form.Select className={errors.frequency && "inputErrors"} {...register("frequency", { required: true })} >
                                        <option value="">Select</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="bi-weekly">Bi-Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="occasionally">Occasionally</option>
                                    </Form.Select>
                                    <br />
                                    {errors.frequency && errors.frequency.type === "required" && (<Alert variant="danger">Frequency is required</Alert>)}
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
            </Container>
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
export default Residence
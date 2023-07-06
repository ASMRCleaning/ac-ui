
import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Image, Alert, Col } from "react-bootstrap";
import { useRouter } from 'next/router';
import { registerResidence, getResidence } from "../lib/residence";
import { useAtom } from "jotai";
import { residenceInfoAtom } from "../store";
import { useForm } from 'react-hook-form';

const Residence = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    //global variable defined in store.js
    const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

    const router = useRouter();

    // Check the object changes
    // useEffect(() => {
    //     console.log(residenceInfo);
    // }, [residenceInfo]);

    // useEffect(() => {
    //     //retrieve residence information when the component mounts
    //     async function fetchResidence() {
    //         const data = await getResidence();
    //         setResidenceInfo({
    //             houseType: data.houseType,
    //             size: data.size,
    //             empty: data.empty,
    //             furnished: data.furnished,
    //             pet: data.pet,
    //             bedroom: data.bedroom,
    //             bathroom: data.bathroom,
    //             den: data.den,
    //             frequency: data.frequency,
    //             address: {
    //                 streetAddress: data.address?.streetAddress,
    //                 unit: data.address?.unit,
    //                 postalCode: data.address?.postalCode,
    //                 city: data.address?.city,
    //                 province: data.address?.province,
    //                 country: data.address?.country
    //             }
    //         });
    //     }

    //     fetchResidence();
    // }, []);

    async function submitForm(data) {
        try {
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

            //call api to store info
            if (updateResidenceInfo.address.streetAddress) {
                await registerResidence(updateResidenceInfo);
                router.push('/result');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Container className="flex">
                <Row className="flex">
                    <Image src="/residence-2.jpg" style={{ height: "10%", width: "105%" }} />
                </Row>
                <br />
                {residenceInfo === null ?
                    <Row>
                        <p style={{ fontWeight: 'bold', fontSize: '2rem' }}>  Please provide you residence information</p>
                    </Row> :
                    <Row>
                        <p style={{ fontWeight: 'bold', fontSize: '2rem' }}>  Check your residence information</p>
                    </Row>}
                <br />
                <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
                    <Row className="mb-6">
                        <Form.Group className="col col-sm-9">
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control className={errors.streetAddress && "inputErrors"}{...register("streetAddress", { required: true })}
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                // value={residenceInfo.address?.streetAddress}
                                placeholder="1111, Street Name" />
                            <br />
                            {errors.streetAddress?.type === "required" && (<Alert variant="danger">Street Address is required</Alert>)}
                            {/* {errors.streetAddress?.type === "minLength" && (<Alert variant="danger">Street Address must be more than 5 charater </Alert>)}
                            {errors.streetAddress?.type === "maxLength" && (<Alert variant="danger">Street Address must be less than 150 charater</Alert>)} */}
                        </Form.Group>
                        <Form.Group className="col col-sm-3">
                            <Form.Label>Apartment, unit, suite, etc</Form.Label>
                            <Form.Control className={errors.unit && "inputErrors"} {...register("unit", { minLength: 1, maxLength: 150 })}
                                type="text"
                                id="unit"
                                name="unit"
                                // value={residenceInfo.address?.unit}
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
                                // value={residenceInfo.address?.postalCode}
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
                                // value={residenceInfo.address?.city}
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
                    {residenceInfo === null ?
                        <Container className="d-flex" style={{ paddingLeft: "35%", justifyItems: "center", alignItems: "center", paddingBottom: '4%' }}>
                            <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "50px", width: "180px" }} type="submit">Save</Button>
                        </Container> :
                        <Row className="mb-3" style={{ padding: "10px" }}>
                            <br />
                            <Col>
                                <Button variant="primary"
                                    className="btn btn-outline-info"
                                    type="submit"
                                    style={{ padding: "10px", margin: "1px", width: "40%" }}
                                // disabled="false"
                                // onClick={enableField}
                                >Edit</Button>
                            </Col>
                            <Col>
                                <Button
                                    // href="/result"
                                    variant="primary"
                                    className="btn btn-outline-success"
                                    type="submit"
                                    disable={Object.keys(errors).length > 0}
                                    // disabled={disable}
                                    style={{ padding: "10px", margin: "1px", width: "40%" }}>Save</Button>
                            </Col>
                        </Row>
                    }
                </Form>
            </Container>
        </>
    )
}

export default Residence

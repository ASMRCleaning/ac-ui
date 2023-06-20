import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Image, Alert, Col } from "react-bootstrap";
import { useRouter } from 'next/router';
import { getResidence, registerResidence } from "../lib/residence";
import { useAtom } from "jotai";
import { userNameAtom, residenceInfoAtom } from "../store";

const Residence = () => {
    const [address, setAddress] = useState('');
    const [unit, setUnit] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [warning, setWarning] = useState('');

    //global variable defined in store.js
    const [userName, setUserName] = useAtom(userNameAtom);
    const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

    const router = useRouter();
    

    useEffect (() =>{
        //retrieve residence information when the component mounts
        async function fetchResidence(){
            const data = await getResidence(userName);
            setResidenceInfo(data);
        }

        fetchResidence();
    }, []);

    async function submitForm(e) {
        e.preventDefault();

        if (address === "" || unit ==="" || postalCode === "" || city === "" || province === "") {
            setWarning('Please fill all required fields above')
            return
        }

        if (province === "Choose...") {
            setWarning('Please choose a province');
            return
        }

        try {
            await registerResidence(address, unit, postalCode, city, province)
            router.push('/login');
            console.log("good")
        }
        catch (err) {
            setWarning(err.message);
            console.log("bad")
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
                        </Row> }
                <br />
                <Form onSubmit={submitForm} className="container mt-3 mb-3">
                    <Row className="mb-6">
                        <Form.Group className="col col-sm-9">
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control type="address"
                                id="address"
                                name="address"
                                value={residenceInfo.address?.address ?? address}
                                placeholder="1111, Street Name"
                                className="form-floating"
                                onChange={e => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="col col-sm-3">
                            <Form.Label>Apartment, unit, suite, etc</Form.Label>
                            <Form.Control type="unit"
                                id="unit"
                                name="unit"
                                value={residenceInfo.address?.unit ?? unit}
                                placeholder="2023"
                                onChange={e => setUnit(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-9">
                        <Form.Group className="col col-sm-4">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text"
                                id="postalCode"
                                name="postalCode"
                                value={residenceInfo.address?.postalCode ?? postalCode}
                                placeholder="A0B-1C7"
                                onChange={e => setPostalCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="col col-sm-8">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text"
                                id="city"
                                name="city"
                                value={residenceInfo.address?.city ?? city}
                                placeholder="Toronto"
                                onChange={e => setCity(e.target.value)} />
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
                            <Form.Select defaultValue="Choose..."
                                id="province"
                                name="province"
                                value={residenceInfo.address?.province ?? province}
                                onChange={e => setProvince(e.target.value)}>
                                <option value="Choose...">Choose...</option>
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
                        </Form.Group>
                    </Row>
                    {warning && (<>
                        <br />
                        <Alert variant="danger">{warning}</Alert>
                    </>)}
                    <br /><br />
                    {residenceInfo === null ?
                    <Container className="d-flex" style={{ paddingLeft: "35%", justifyItems: "center", alignItems: "center", paddingBottom: '4%' }}>
                        <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "50px", width: "180px" }} type="submit">Save</Button>
                    </Container> :
                    <Row className="mb-3" style={{padding:"10px"}}>
                <br /> 
                <Col>
                <Button variant="primary" 
                        className="btn btn-outline-info" 
                        type="submit" 
                        style={{padding: "10px", margin: "1px", width: "40%"}}
                        // disabled="false"
                        // onClick={enableField}
                        >Edit</Button>
                </Col>
                <Col>
                <Button
                        href="/result"
                        variant="primary" 
                        className="btn btn-outline-success" 
                        type="submit" 
                        // disabled={disable}
                        style={{padding: "10px", margin: "1px", width: "40%"}}>Save</Button>
                </Col>
                </Row>
                    }
                </Form>
            </Container>
        </>
    )
}

export default Residence
import React, { useState } from "react";
import { registerUser } from "../lib/authenticate";
import { Form, Row, Button, Image, Alert, Container, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import Error from 'next/error';
import useSWR from 'swr';

const Profile = ({userId}) => {
    const [user, setUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('');
    const [warning, setWarning] = useState('');
    const [disable, setDisable] = useState(true);

    const router = useRouter();

    const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`)

    if(error){
        return <Error statusCode={404}/>
    }
    else{

    async function submitForm(e) {
        e.preventDefault();

        if(user === "") return setWarning('You do not have a user. Please register first in Login page')
        if (user === "" || firstName === "" || lastName === "" || password === "" || password2 === "" || role === "") {
            setWarning('Please fill all required fields above')
            return
        }

        if (password !== password2) {
            setWarning('Password do not match');
            return
        }
        try {
            await registerUser(user, firstName, lastName, password, password2, role)
            router.push('/login');
        }
        catch (err) {
            setWarning(err.message);
        }
    }

    function enableField(e){
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
            <Form  onSubmit={submitForm} className="container mt-3 mb-3" style={{paddingLeft:"10%"}}>
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text"
                            id="user"
                            name="user"
                            value={user}
                            disabled="true"
                            onChange={e => setUser(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            disabled={disable}
                            onChange={e => setFirstName(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            disabled={disable}
                            onChange={e => setLastName(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row>
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password"
                            value={password}
                            id="password"
                            name="password"
                            disabled={disable}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className=" col col-sm-9" >
                        <Form.Label>Confirm the password:</Form.Label>
                        <Form.Control type="password"
                            value={password2}
                            id="password2"
                            name="password2"
                            disabled={disable}
                            onChange={e => setPassword2(e.target.value)} />
                    </Form.Group>
                </Row>
                {warning && (<>
                    <br />
                    <Alert variant="danger">{warning}</Alert>
                </>)}
                <br />
                <Row className="mb-3" style={{padding:"10px"}}>
                <br /> 
                <Col>
                <Button variant="primary" 
                        className="btn btn-outline-info" 
                        type="submit" 
                        style={{padding: "10px", margin: "1px", width: "40%"}}
                        disabled={!disable}
                        onClick={enableField}>Edit</Button>
                </Col>
                <Col>
                <Button variant="primary" 
                        className="btn btn-outline-success" 
                        type="submit" 
                        disabled={disable}
                        style={{padding: "10px", margin: "1px", width: "40%"}}>Save</Button>
                </Col>
                </Row>
            </Form>
            </Container>
        </>
    );
    }
}

export default Profile

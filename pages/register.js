import React, { useState } from "react";
import { registerUser } from "../lib/authenticate";
import { Form, Row, Button, Card, Alert } from "react-bootstrap";
import { useRouter } from "next/router";

const RegisterPage = () => {
    const [user, setUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('');
    const [warning, setWarning] = useState('');

    const router = useRouter();

    async function submitForm(e) {
        e.preventDefault();

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

    return (
        <>
            <Card bg="info" className="container mt-3 mb-3">
                <Card.Body lassName="col col-sm-9">
                    <h2 style={{ color: '#f0f5fa', justifyItems: "center", alignItems: "center" }}>Create an Account</h2>
                    <p style={{ color: '#f0f5fa', fontSize: "1.5rem" }}>Please fill all required field to create an account in our website</p></Card.Body>
            </Card>
            <br />
            <Form onSubmit={submitForm} className="container mt-3 mb-3">
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text"
                            id="user"
                            name="user"
                            value={user}
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
                            onChange={e => setLastName(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-9">
                    <Form.Group className="col col-sm-9">
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="Choose..."
                            id="role"
                            name="role"
                            value={role}
                            onChange={e => setRole(e.target.value)}>
                            <option value="Choose...">Choose...</option>
                            <option value="customer">Customer</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </Form.Select>
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
                            onChange={e => setPassword2(e.target.value)} />
                    </Form.Group>
                </Row>
                {warning && (<>
                    <br />
                    <Alert variant="danger">{warning}</Alert>
                </>)}
                <br />
                <Button variant="primary" className="btn btn-outline-success" type="submit">Register</Button>
            </Form>
        </>
    )
}

export default RegisterPage
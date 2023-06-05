import { React, useState } from "react";
import { Card, Button, Form, Row, Col, Image, Container } from "react-bootstrap";
import { MdEmail } from "react-icons/md"
import { BsTelephoneFill, BsFacebook, BsYoutube, BsInstagram  } from "react-icons/bs"

const ContactUs = () => {
    const [message, setMessage] = useState();

    function submitForm(e) {
        e.preventDefault();
        setMessage("");
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    return (<>
        <h3>Contact Us</h3>
        <br />
        <br />
        <p style={{ fontSize: "1.5rem", fontStyle: "oblique" }}>
            If you have need more information about our services or products, please send us a message and we will be
            happy to answer all your question.
        </p>
        <Card bg="light">
            <Card.Body><h2>Contact us by</h2>
                <a href="mailto:seneca.asmrcleaning@gmail.com"
                    className="email social">
                    <MdEmail size={20} />
                </a>
                < a href="mailto:seneca.asmrcleaning@gmail.com" >seneca.asmrcleaning@gmail.com</a>
                <br />
                <br />
            </Card.Body>
        </Card>
        <br />
        <Card bg="light">
            <Card.Body><h2>Become part of the team</h2>
                <p> Send us your resume and, we will be happy to have you in our team</p>
                <a href="mailto:seneca.asmrcleaning@gmail.com"
                    className="email social">
                    <MdEmail size={20} />
                </a>
                < a href="mailto:seneca.asmrcleaning@gmail.com" >seneca.asmrcleaning@gmail.com</a>
                <br />
                <br /><br />
            </Card.Body>
        </Card>
        <br /><br />
        <Form onSubmit={submitForm}>
            <Form.Group>
                <Form.Label> <h3>Send us a message:</h3></Form.Label>
                <Form.Control
                    id="message"
                    name="message"
                    as="textarea"
                    rows={12}
                    placeholder="Leave here a message and we'll return back to you"
                    value={message}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
        <br />
        <Container className="d-flex" style={{ justifyContent: "center", alignContent: "center" }}>
            <Button className="btn-outline-primary"
                type="submit"
                variant="success"
                size="lg"
                style={{ height: '70px', width: "200px", textAlign: "center" }}
                onClick={submitForm}>Send</Button>
        </Container>
        <br />
    </>
    )
}

export default ContactUs
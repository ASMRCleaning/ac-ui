import React from "react";
import { Card, Button } from "react-bootstrap";

const About =() =>{
    return(
        <>
            <h3>About Page</h3>
            <br />
            <Card bg="light">
                <Card.Body><h2>Add company information on it</h2>qwerty</Card.Body>
            </Card>
            <br />
            <br />
            <br />
            <Card bg="light">
                <Card.Body><h2>Company contact</h2>email: asmr@asmr <br/> telephone: (123)456-7890</Card.Body>
            </Card>
            <br />
            <br />
            <br />
            <Card bg="light">
                <Card.Body><h2>Company's Team</h2> Redirect to Employee's page <br /><br />
                <Button variant="secondary">Meet our Team</Button>{' '}
                </Card.Body>
            </Card>
        </>
    );
}

export default About
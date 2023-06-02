import React from "react";
import { Card, Button} from "react-bootstrap";

const ContactUs = () =>{

    return(<>
                <h3>Contact Us</h3>
            <br />
            <Card bg="light">
                <Card.Body><h2>Company contact</h2>email: asmr@asmr <br/> telephone: (123)456-7890</Card.Body>
            </Card>
            <br />
            <br />
            <br />
            <Card bg="light">
                <Card.Body><h2>Become part of the team</h2> email:hiring@asmrcleaning.com <br /><br />
                <Button variant="secondary">Apply for a job now</Button>{' '}
                </Card.Body>
            </Card>
    </>
    )
}

export default ContactUs
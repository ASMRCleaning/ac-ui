import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userNameAtom, customerInfoAtom, residenceInfoAtom } from "../store";
import { getCustomerInfo } from "../lib/customer";
import { registerResidence } from "../lib/residence";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  //global variable to store customer information and get userName
  const [userName, setUserName] = useAtom(userNameAtom);
  const [customerInfo, setCustomerInfo] = useAtom(customerInfoAtom);
  const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

  const router = useRouter();

  //get where login page comes from
  const source = sessionStorage.getItem('source');

  // useEffect(() => {
  //   console.log(`userName was changed to: ${userName}`);
  // }, [userName]);

  // useEffect(() => {
  //   console.log(`customer was changed to: ${customerInfo.firstName}`);
  // }, [customerInfo.firstName]);

  // useEffect(() => {
  //   console.log(`Residence info: ${residenceInfo.houseType}`);
  // }, [residenceInfo.houseType]);

  // useEffect(() => {
  //   const source = sessionStorage.getItem('source');
  //   if (source === 'questionnaire') {
  //     // Redirect to the home page after login
  //     router.push('/residenceAddress');
  //   } else {
  //     // Redirect to a default page or display an error message
  //     router.push('/userHome');
  //   }

    // Clear the session storage value after use
  //   sessionStorage.removeItem('source');
  // }, []);

  async function submitForm(e) {
    e.preventDefault();

    if (user === "" || password === "") {
      setWarning('Please fill all required fields above')
      return
    }
    try {
      //get the userName
      const username = await authenticateUser(user, password)
      setUserName(username);

      //TODO see better practice on that and why first call fail
      const customer = await getCustomerInfo();
      setCustomerInfo({
        userId: customer.userId,
        firstName: customer.firstName,
        lastName: customer.lastName
      });

      // check if user has residence info to send to API side due to questionnaire form
        // if(residenceInfo){
        //   try{
        //     const res = await registerResidence(residenceInfo);
        //   }
        //   catch(err){
        //     console.log(err)
        //   }
        //   router.push('/residenceAddress');
        // }
        // else{
        //   router.push('/userHome');
        // }

        router.push("/residenceAddress");

    }
    catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <br />
      <Container className="d-fluid">
        <Card bg="light" style={{ width: "30%" }}>
          <Card.Body>
            <h2>Login</h2>
            <br />
            Enter your user ID and password
          </Card.Body>
        </Card>
        <br />
        <Form onSubmit={submitForm}>
          <Form.Group style={{ width: "30%" }}>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={user}
              id="userName"
              name="userName"
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group style={{ width: "30%" }}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}

          <br />
          <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
            Login
          </Button>
          &nbsp;  &nbsp;  &nbsp;
          <Button href="/register" variant="primary" className="btn btn-outline-info btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
            Create account
          </Button>
        </Form>
        <br /> {/* This helps the footer go down so that it looks clean */}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /><br /><br />
      </Container>
    </>
  );
}
import  React, { useState } from "react";
import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userInfoAtom, residenceInfoAtom } from "../store";
import { getUserInfo } from "../lib/user";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  //global variable to store customer information and get userName
  const [userInfo, setuserInfo] = useAtom(userInfoAtom);
  const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

  const router = useRouter();

  //get where login page comes from
  const source = sessionStorage.getItem('source');

  // useEffect(() => {
  //   console.log(`userName was changed to: ${userName}`);
  // }, [userName]);

  // useEffect(() => {
  //   console.log(`customer was changed to: ${userInfo.firstName}`);
  // }, [userInfo.firstName]);

  // useEffect(() => {
  //   console.log(`Residence info: ${residenceInfo.houseType}`);
  // }, [residenceInfo.houseType]);

  async function submitForm(e) {
    e.preventDefault();

    if (user === "" || password === "") {
      setWarning('Please fill all required fields above')
      return
    }
    try {
      //get the userName
      await authenticateUser(user, password)
  
      const customer = await getUserInfo();
      setuserInfo({
        username: customer.user.username,
        firstName: customer.user.firstName,
        lastName: customer.user.lastName,
        role: customer.role,
      });

      if (source === "questionnaire" && userInfo.role === "customer") { router.push("/residence"); }
      else { router.push("/userHome"); }

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
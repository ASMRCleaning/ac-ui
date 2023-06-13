import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  async function submitForm(e) {
    e.preventDefault();

    if (user === "" || password === "") {
      setWarning('Please fill all required fields above')
      return
    }
    try {
      await authenticateUser(user, password)
      router.push('/userHome');
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

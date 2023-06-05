import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";

export default function Login(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(`TODO: Submit form with: ${user}/ ${password}`)

    try {
      await authenticateUser(user, password);
      router.push("/userHome");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <br />
      <Card bg="light" style={{ width: "30%" }}>
        <Card.Body>
          <h2>Login</h2>
          <br />
          Enter your user ID and password
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
      <br /> {/* This helps the footer go down so that it looks clean */}
    </>
  );
}

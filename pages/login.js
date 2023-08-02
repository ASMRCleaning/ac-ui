import React, { useState } from "react";
import { Form, Alert, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { authenticateUser } from "../lib/authenticate";
import { getUserInfo } from "../lib/user";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const source = sessionStorage.getItem("source"); //get the session 
  const { register, handleSubmit, formState: { errors } } = useForm();

  //global variable to store customer information and get userName
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  //login user
  async function submitForm(data) {
    try {

      //authenticate user logon
      await authenticateUser(data.username, data.password)

      //get user information
      const userData = await getUserInfo();

      //set user info into global variable
      await setUserInfo({
        username: userData.user.username,
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
        email: userData.user.email,
        phone: userData.user.phone,
        role: userData.user.role
      });

      if (source === "questionnaire") {
        router.push("/customer/residence");
      }
      else {
        //render the correct userHome
        userData.user.role === "customer"
          ? router.push("/customer/userHome")
          : router.push("employee/userHome");
      }
    }
    catch (err) {
      if (err.message.includes("500")) {
        setErrorMessage("Missing username or password.");
      } else if (err.message.includes("404")) {
        setErrorMessage("User and password combination not found.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  }
  return (
    <>
      <Row className="mb-9" style={{ marginTop: '110px' }}>
        <p style={{ fontWeight: 'bold', fontSize: '4rem', textAlign: "center" }}>  Login
        </p>
      </Row>
      <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
        <Row className="mb-9" >
          <Form.Group className="col col-sm-6" style={{ marginTop: '70px', marginLeft: '350px' }}>
            <Form.Control className={errors.username && "inputErrors"}{...register("username", { required: true })}
              type="text"
              id="username"
              name="username"
              placeholder="User" />
            <br />
            {errors.username?.type === "required" && (<Alert variant="danger">User Name is required</Alert>)}
          </Form.Group>
        </Row>
        <br />
        <Row className="mb-9">
          <Form.Group className="col col-sm-6" style={{ marginLeft: '350px' }}>
            <Form.Control className={errors.password && "inputErrors"}{...register("password", { required: true })}
              type="password"
              id="password"
              name="password"
              placeholder="Password" />
            <br />
            {errors.password?.type === "required" && (<Alert variant="danger">Password is required</Alert>)}
          </Form.Group>
        </Row>
        <br /><br />
        <Row className="mb-9" style={{ marginLeft: '450px' }} >
          <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
            Login
          </Button>
          &nbsp;  &nbsp;  &nbsp;
          <Button href="/register" variant="primary" className="btn btn-outline-info btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
            Create account
          </Button>
          <br />
          <br />
        </Row>
      </Form>
      {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
    </>
  );
}
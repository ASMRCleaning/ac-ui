import React, { useState } from "react";
import { Container, Row, Form, Button, Image, Alert, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { residenceInfoAtom } from "../store";
import { useForm } from 'react-hook-form';
import { isAuthenticated } from "../lib/authenticate";
import { getResidence, registerResidence, updateResidence } from "../lib/residence";

const Questionnaire = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

  const router = useRouter();

  async function submitForm(data) {
    setResidenceInfo({
      houseType: data.houseType,
      size: data.size,
      empty: data.empty,
      furnished: data.furnished,
      pet: data.pet,
      bedroom: data.bedroom,
      bathroom: data.bathroom,
      den: data?.den || 0,
      frequency: data.frequency
    });

    //check if user is authenticated
    const userFound = isAuthenticated()

    if (userFound) {
      router.push('/residenceAddress');
      //TODO
      //if authenticated, check if user has a residence registered
      // const residenceFound = await getResidence()

    //   if (residenceFound) {
    //     try {
    //       //if found a residence update the register
    //       await updateResidence(residenceInfo);
    //     }
    //     catch (err) {
    //       console.log(err);
    //     }
    //   }
    //   else {
    //     try {
    //       //if not add a residence
    //       await registerResidence(residenceInfo);
    //       router.push('/residenceAddress');
    //     }
    //     catch (err) {
    //       console.log(err);
    //     }
    //   }
    }
    else {
      router.push('/login');
    }
  }

  return (
    <>
      <Container className="flex">
        <Form onSubmit={handleSubmit(submitForm)} className="container mt-3 mb-3">
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>Choose your house type:</Form.Label>
              <Form.Select className={errors.houseType && "inputErrors"} {...register("houseType", { required: true })}>
                <option value="">Select</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
              </Form.Select>
              <br />
              {errors.houseType && errors.houseType.type === "required" && (<Alert variant="danger">House Type is required</Alert>)}
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>Enter your house length: </Form.Label>
              <Form.Control className={errors.size && "inputErrors"} {...register("size", { required: true, min: 100, max: 2000 })}
                type="text"
                id="size"
                placeholder="Enter just the length without the unit of measure (ex.: 1400)" />
              <br />
              {errors.size?.type === "required" && (<Alert variant="danger">Size is required</Alert>)}
              {errors.size?.type === "min" && (<Alert variant="danger">Size must be greater than 100</Alert>)}
              {errors.size?.type === "max" && (<Alert variant="danger">Size must be less than 2000</Alert>)}
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>The residence is empty? </Form.Label>
              <Form.Check className={errors.empty && "inputErrors"} {...register("empty")}
                type="switch"
                id="empty"
                label="Empty" />
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>Is it furnished? </Form.Label>
              <Form.Check  {...register("furnished",)}
                type="switch"
                id="furnished"
                label="Has one or more item in that" />
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>The residence has any pet? </Form.Label>
              <Form.Check  {...register("pet")}
                type="switch"
                id="pet"
                label="Contain a Pet" />
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>How many bedrooms it has? </Form.Label>
              <Form.Control className={errors.bedroom && "inputErrors"}  {...register("bedroom", { required: true, min: 1, max: 10 })}
                type="text"
                id="bedroom"
                placeholder="Enter a number between 1 to 10" />
              <br />
              {errors.bedroom?.type === "required" && (<Alert variant="danger">Bedroom is required</Alert>)}
              {errors.bedroom?.type === "min" && (<Alert variant="danger">Bedroom must be greater than or equal 1</Alert>)}
              {errors.bedroom?.type === "max" && (<Alert variant="danger">Bedroom must be less than or equal 10</Alert>)}
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>How many bathroom it has? </Form.Label>
              <Form.Control className={errors.bathroom && "inputErrors"} {...register("bathroom", { required: true, min: 1, max: 10 })}
                type="text"
                id="bathroom"
                placeholder="Enter a number between 1 to 10" />
              <br />
              {errors.bathroom?.type === "required" && (<Alert variant="danger">Bathroom is required</Alert>)}
              {errors.bathroom?.type === "min" && (<Alert variant="danger">Bathroom must be greater than or equal 1</Alert>)}
              {errors.bathroom?.type === "max" && (<Alert variant="danger">Bathroom must be less than or equal 10</Alert>)}
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>How many dens or small offices it has? </Form.Label>
              <Form.Control className={errors.den && "inputErrors"}{...register("den", { max: 10 })}
                type="text"
                id="den"
                placeholder="Enter a number between 1 to 10" />
              <br />
              {errors.den?.type === "max" && (<Alert variant="danger">Den/Office must be less than or equal 10</Alert>)}
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-6">
            <Form.Group className="col col-sm-9">
              <Form.Label>How often do you want the cleaning service?</Form.Label>
              <Form.Select className={errors.frequency && "inputErrors"} {...register("frequency", { required: true })} >
                <option value="">Select</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="occasionally">Occasionally</option>
              </Form.Select>
              <br />
              {errors.frequency && errors.frequency.type === "required" && (<Alert variant="danger">Frequency is required</Alert>)}
            </Form.Group>
          </Row>
          <Button type="submit" disable={Object.keys(errors).length > 0}>
            Submit
          </Button>
        </Form>
      </Container>

    </>
  )
}

export default Questionnaire;
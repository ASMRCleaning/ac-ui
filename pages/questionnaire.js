import React from "react";
import { Container, Row, Button, Form, Alert, Col } from "react-bootstrap";
import { questionnaireForm } from "../lib/questionnaire";
import { getResidence, registerResidence } from "../lib/residence";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userNameAtom, residenceInfoAtom } from "../store";

const questionnaire = () => {
  const [houseType, setHouseType] = useState("");
  const [size, setSize] = useState("");
  const [empty, setEmpty] = useState("");
  const [furnished, setFurnished] = useState("");
  const [pet, setPet] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bath, setBath] = useState("");
  const [dens, setDens] = useState("");
  const [frequency, setFrequency] = useState("");
  const [warning, setWarning] = useState("");

  //global variable defined in store.js
  const [userName, setUserName] = useAtom(userNameAtom);
  const [questionnaireInfo, setQuestionnaireInfo] = useAtom(residenceInfoAtom);

  const router = useRouter();

  useEffect(() => {
    //retrieve residence information when the component mounts
    async function fetchQuestionnaireForm() {
      const data = await questionnaireForm(userName);
      setQuestionnaireInfo(data);
    }

    fetchQuestionnaireForm();
  }, []);

  async function submitForm(e) {
    e.preventDefault();

    if (
      houseType === "" ||
      size === "" ||
      empty === "" ||
      furnished === "" ||
      pet === "" ||
      bedrooms === "" ||
      bath === "" ||
      dens === "" ||
      frequency === ""
    ) {
      setWarning("Please fill answer to all questions");
      return;
    }
  }

  return (
    <>
      <Container className="flex">
        <Form onSubmit={submitForm} className="container mt-3 mb-3">
          <Row className="mb-6">
            <Form.legend className="Title">
              House Type Questionnaire Form
            </Form.legend>
            <br />
            <br />
            <br />
            <Form.Group className="form-check">
              <p>
                <strong>What is your House Type?</strong>
              </p>
              <Form.Label
                className="form-check-label"
                for="houseType"
              ></Form.Label>  
              <Form.Control
                type="radio"
                className="form-check-input"
                name="houseType"
                id="houseType"
                value={questionnaireInfo.houseType?.houseType ?? houseType}
                onChange={(e) => setValue(e.target.value)}
              />
              Apartment
            </Form.Group>
            <Form.Group className="form-check">
              <Form.Label className="form-check-label" for="houseType">
                <Form.Control
                  type="radio"
                  className="form-check-input"
                  name="houseType"
                  id="houseType"
                  value={questionnaireInfo.houseType?.houseType ?? houseType}
                  onChange={(e) => setValue(e.target.value)}
                />
                Condo
              </Form.Label>
            </Form.Group>
            <Form.Group className="form-check">
              <Form.Label className="form-check-label" for="houseType">
                <Form.Control
                  type="radio"
                  className="form-check-input"
                  name="houseType"
                  id="houseType"
                  value={questionnaireInfo.houseType?.houseType ?? houseType}
                  onChange={(e) => setValue(e.target.value)}
                />
                House
              </Form.Label>
            </Form.Group>
          </Row>

          <br />
          <br />
          {/* 
          <div className="form-check">
            <p>
              <strong>What is the approximate scale of your house?</strong>
            </p>
            <div className="form-group">
              <label
                for="exampleTextarea"
                className="form-input-lable-2"
              ></label>
              <textarea
                {...register("size")}
                className="form-control"
                id="size"
                rows="1"
              ></textarea>
            </div>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>Empty or Occupied?</strong>
            </p>
            <label className="form-check-label" for="empty">
              <input
                {...register("empty")}
                className="form-check-input"
                type="radio"
                name="empty"
                id="empty"
                value={residenceInfo.empty ?? empty}
                onChange={(data) => setValue(data.target.value)}
              />
              Empty
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" for="empty">
              <input
                {...register("empty")}
                className="form-check-input"
                type="radio"
                name="empty"
                id="empty"
                value={residenceInfo.empty ?? empty}
                onChange={(data) => setValue(data.target.value)}
              />
              Occupied
            </label>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>Is it furnished?</strong>
            </p>
            <label className="form-check-label" for="furnished">
              <input
                {...register("furnished")}
                className="form-check-input"
                type="radio"
                name="furnished"
                id="furnished"
                value={residenceInfo.furnished ?? furnished}
                onChange={(data) => setValue(data.target.value)}
              />
              Yes
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" for="furnished">
              <input
                {...register("furnished")}
                className="form-check-input"
                type="radio"
                name="furnished"
                id="furnished"
                value={residenceInfo.furnished ?? furnished}
                onChange={(data) => setValue(data.target.value)}
              />
              No
            </label>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>Do you have any Pets?</strong>
            </p>
            <label className="form-check-label" for="pet">
              <input
                {...register("pet")}
                className="form-check-input"
                type="radio"
                name="pet"
                id="pet"
                value={residenceInfo.pet ?? pet}
                onChange={(data) => setValue(data.target.value)}
              />
              Yes
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" for="pet">
              <input
                {...register("pet")}
                className="form-check-input"
                type="radio"
                name="pet"
                id="pet"
                value={residenceInfo.pet ?? pet}
                onChange={(data) => setValue(data.target.value)}
              />
              No
            </label>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>How many bedrooms do you have?</strong>
            </p>
            <div className="form-group">
              <label
                for="exampleTextarea"
                className="form-input-lable-2"
              ></label>
              <textarea
                {...register("bedrooms")}
                className="form-control"
                id="size"
                rows="1"
              ></textarea>
            </div>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>How many bedrooms do you have?</strong>
            </p>
            <div className="form-group">
              <label
                for="exampleTextarea"
                className="form-input-lable-2"
              ></label>
              <textarea
                {...register("batg")}
                className="form-control"
                id="bath"
                rows="1"
              ></textarea>
            </div>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>How many dens or small offices do you have?</strong>
            </p>
            <div className="form-group">
              <label
                for="exampleTextarea"
                className="form-input-lable-2"
              ></label>
              <textarea
                {...register("dens")}
                className="form-control"
                id="dens"
                rows="1"
              ></textarea>
            </div>
          </div>

          <br />
          <br />

          <div className="form-check">
            <p>
              <strong>How often do you want us come?</strong>
            </p>
            <label className="form-check-label" for="frequency">
              <input
                {...register("frequency")}
                className="form-check-input"
                type="radio"
                name="frequency"
                id="frequency"
                value="Weekly"
              />
              Weekly
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" for="frequency">
              <input
                {...register("frequency")}
                className="form-check-input"
                type="radio"
                name="frequency"
                id="frequency"
                value="Bi-Weekly"
              />
              Bi-Weekly
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" for="frequency">
              <input
                {...register("frequency")}
                className="form-check-input"
                type="radio"
                name="frequency"
                id="frequency"
                value="Monthly"
              />
              Monthly
            </label>
          </div>

          <br />
          <br /> */}
          <Button
            href="/residenceAddress"
            variant="primary"
            className="pull-right"
            type="submit"
          >
            Next
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default questionnaire;

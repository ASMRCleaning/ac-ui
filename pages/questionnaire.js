import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { getResidence, registerResidence } from "../lib/residence";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userNameAtom, residenceInfoAtom } from "../store";

export default function questionnaire() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      houseType: "",
      size: "",
      empty: "",
      furnished: "",
      pet: "",
      bedrooms: "",
      bath: "",
      dens: "",
      frequency: "",
    },
  });

  useEffect(() => {
    let data = {
      houseType: "",
      size: "",
      empty: "",
      furnished: "",
      pet: "",
      bedrooms: "",
      bath: "",
      dens: "",
      frequency: "",
    };

    // set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
      console.log(houseType);
    }
  }, []);

  const [userName, setUserName] = useAtom(userNameAtom);
  const [residenceInfo, setResidenceInfo] = useAtom(residenceInfoAtom);

  useEffect(() => {
    //retrieve residence information when the component mounts
    async function fetchResidence() {
      const data = await getResidence(userName);
      setResidenceInfo(data);
    }

    fetchResidence();
  }, []);

  async function onSubmit(data) {
    data.preventDefault();

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
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="form-group">
        <legend className="Title">House Type Questionnaire Form</legend>
        <br />
        <br />
        <br />
        <div className="form-check">
          <p>
            <strong>What is your House Type?</strong>
          </p>
          <label className="form-check-label" for="houseType">
            <input
              {...register("houseType")}
              className="form-check-input"
              type="radio"
              name="houseType"
              id="houseType"
              value={residenceInfo.houseType ?? houseType}
              onChange={(data) => setValue(data.target.value)}
            />
            Apartment
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="houseType">
            <input
              {...register("houseType")}
              className="form-check-input"
              type="radio"
              name="houseType"
              id="houseType"
              value={residenceInfo.houseType ?? houseType}
              onChange={(data) => setValue(data.target.value)}
            />
            Condo
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="houseType">
            <input
              {...register("houseType")}
              className="form-check-input"
              type="radio"
              name="houseType"
              id="houseType"
              value={residenceInfo.houseType ?? houseType}
              onChange={(data) => setValue(data.target.value)}
            />
            House
          </label>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>What is the approximate scale of your house?</strong>
          </p>
          <div className="form-group">
            <label for="exampleTextarea" className="form-input-lable-2"></label>
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
            <label for="exampleTextarea" className="form-input-lable-2"></label>
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
            <label for="exampleTextarea" className="form-input-lable-2"></label>
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
            <label for="exampleTextarea" className="form-input-lable-2"></label>
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
        <br />
      </fieldset>
      <Button
        href="/residenceAddress"
        variant="primary"
        className="pull-right"
        type="submit"
      >
        Next
      </Button>
    </form>
  );
}

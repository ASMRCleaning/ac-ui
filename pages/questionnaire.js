import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { questionnaireForm } from "../lib/questionnaire";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";


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
    }
  }, []);

  function onSubmit(data) {
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
              value="Apartment"
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
              value="Condo"
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
              value="House"
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
              value="Empty"
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
              value="Occupied"
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
              value="Yes"
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
              value="No"
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
              value="Yes"
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
              value="No"
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
          <label className="form-check-label" for="bedrooms">
            <input
              {...register("bedrooms")}
              className="form-check-input"
              type="radio"
              name="bedrooms"
              id="bedrooms"
              value="1~5"
            />
            1~5
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="bedrooms">
            <input
              {...register("bedrooms")}
              className="form-check-input"
              type="radio"
              name="bedrooms"
              id="bedrooms"
              value="6~10"
            />
            6~10
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="bedrooms">
            <input
              {...register("bedrooms")}
              className="form-check-input"
              type="radio"
              name="bedrooms"
              id="bedrooms"
              value="11~15"
            />
            11~15
          </label>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>How many bathrooms do you have?</strong>
          </p>
          <label className="form-check-label" for="bath">
            <input
              {...register("bath")}
              className="form-check-input"
              type="radio"
              name="bath"
              id="bath"
              value="1~3"
            />
            1~3
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="bath">
            <input
              {...register("bath")}
              className="form-check-input"
              type="radio"
              name="bath"
              id="bath"
              value="4~6"
            />
            4~6
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="bath">
            <input
              {...register("bath")}
              className="form-check-input"
              type="radio"
              name="bath"
              id="bath"
              value="7~9"
            />
            7~9
          </label>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>How many dens or small offices do you have?</strong>
          </p>
          <label className="form-check-label" for="dens">
            <input
              {...register("dens")}
              className="form-check-input"
              type="radio"
              name="dens"
              id="dens"
              value="1~3"
            />
            1~3
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="dens">
            <input
              {...register("dens")}
              className="form-check-input"
              type="radio"
              name="dens"
              id="dens"
              value="4~6"
            />
            4~6
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="dens">
            <input
              {...register("dens")}
              className="form-check-input"
              type="radio"
              name="dens"
              id="dens"
              value="7~9"
            />
            7~9
          </label>
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
      <Button variant="primary" className="pull-right" type="submit">
        Submit
      </Button>
    </form>
  );
}

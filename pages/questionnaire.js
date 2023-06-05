import React from "react";
import { useForm } from "react-hook-form";

export default function questionnaire() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
          <label className="form-check-label" for="Question1">
            <input
              {...register("Question1")}
              className="form-check-input"
              type="radio"
              name="Question1"
              id="Question1"
              value="Apartment"
            />
            Apartment
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question1">
            <input
              {...register("Question1")}
              className="form-check-input"
              type="radio"
              name="Question1"
              id="Question1"
              value="Condo"
            />
            Condo
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question1">
            <input
              {...register("Question1")}
              className="form-check-input"
              type="radio"
              name="Question1"
              id="Question1"
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
              {...register("Question2")}
              className="form-control"
              id="exampleTextarea1"
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
          <label className="form-check-label" for="Question3">
            <input
              {...register("Question3")}
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3"
              value="Empty"
            />
            Empty
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question3">
            <input
              {...register("Question3")}
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3"
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
          <label className="form-check-label" for="Question4">
            <input
              {...register("Question4")}
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4"
              value="Yes"
            />
            Yes
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question4">
            <input
              {...register("Question4")}
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4"
              value="No"
            />
            No
          </label>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>How many people are there in the household?</strong>
          </p>
          <div className="form-group">
            <label for="exampleTextarea" className="form-input-lable-2"></label>
            <textarea
              {...register("Question5")}
              className="form-control"
              id="exampleTextarea2"
              rows="1"
            ></textarea>
          </div>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>Do you have any Pets?</strong>
          </p>
          <label className="form-check-label" for="Question6">
            <input
              {...register("Question6")}
              className="form-check-input"
              type="radio"
              name="Question6"
              id="Question6"
              value="Yes"
            />
            Yes
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question6">
            <input
              {...register("Question6")}
              className="form-check-input"
              type="radio"
              name="Question6"
              id="Question6"
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
          <label className="form-check-label" for="Question7">
            <input
              {...register("Question7")}
              className="form-check-input"
              type="radio"
              name="Question7"
              id="Question7"
              value="1~5"
            />
            1~5
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question7">
            <input
              {...register("Question7")}
              className="form-check-input"
              type="radio"
              name="Question7"
              id="Question7"
              value="6~10"
            />
            6~10
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question7">
            <input
              {...register("Question7")}
              className="form-check-input"
              type="radio"
              name="Question7"
              id="Question7"
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
          <label className="form-check-label" for="Question8">
            <input
              {...register("Question8")}
              className="form-check-input"
              type="radio"
              name="Question8"
              id="Question8"
              value="1~3"
            />
            1~3
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question8">
            <input
              {...register("Question8")}
              className="form-check-input"
              type="radio"
              name="Question8"
              id="Question8"
              value="4~6"
            />
            4~6
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question8">
            <input
              {...register("Question8")}
              className="form-check-input"
              type="radio"
              name="Question8"
              id="Question8"
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
          <label className="form-check-label" for="Question9">
            <input
              {...register("Question9")}
              className="form-check-input"
              type="radio"
              name="Question9"
              id="Question9"
              value="1~3"
            />
            1~3
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question9">
            <input
              {...register("Question9")}
              className="form-check-input"
              type="radio"
              name="Question9"
              id="Question9"
              value="4~6"
            />
            4~6
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question9">
            <input
              {...register("Question9")}
              className="form-check-input"
              type="radio"
              name="Question9"
              id="Question9"
              value="7~9"
            />
            7~9
          </label>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>What do you want us to focus on?</strong>
          </p>
          <label className="form-check-label" for="Question10">
            <input
              {...register("Question10")}
              className="form-check-input"
              type="radio"
              name="Question10"
              id="Question10"
              value="Kitchen"
            />
            Kitchen
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question10">
            <input
              {...register("Question10")}
              className="form-check-input"
              type="radio"
              name="Question10"
              id="Question10"
              value="Bedrooms"
            />
            Bedrooms
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question10">
            <input
              {...register("Question10")}
              className="form-check-input"
              type="radio"
              name="Question10"
              id="Question10"
              value="Bathrooms"
            />
            Bathrooms
          </label>
        </div>

        <br />
        <br />

        <div className="form-check">
          <p>
            <strong>How often do you want us come?</strong>
          </p>
          <label className="form-check-label" for="Question11">
            <input
              {...register("Question11")}
              className="form-check-input"
              type="radio"
              name="Question11"
              id="Question11"
              value="Weekly"
            />
            Weekly
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question11">
            <input
              {...register("Question11")}
              className="form-check-input"
              type="radio"
              name="Question11"
              id="Question11"
              value="Bi-Weekly"
            />
            Bi-Weekly
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" for="Question11">
            <input
              {...register("Question11")}
              className="form-check-input"
              type="radio"
              name="Question11"
              id="Question11"
              value="Monthly"
            />
            Monthly
          </label>
        </div>

        <br />
        <br />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );  
}

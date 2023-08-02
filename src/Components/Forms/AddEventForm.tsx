import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

import "./Form.css";

type AddEventFormProps = {
  formCallback?: (data: AddEventFormDataType) => void;
  closeForm?: () => void;
};

export type AddEventFormDataType = {
  name: string;
  date: string;
  peopleAmount: number;
  budget: number;
  currency: string;
  participants: AddEventFormParticipantsDataType[];
};

export type AddEventFormParticipantsDataType = {
  participantName: string;
  participantSurname: string;
  participantEmail: string;
};

const AddEventForm = ({ formCallback, closeForm }: AddEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddEventFormDataType>();

  const { fields, append, remove } = useFieldArray({
    name: "participants",
    control,
  });

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
    const { name, date, peopleAmount, budget, currency, participants } = data;

    if (formCallback) {
      formCallback({
        name,
        date,
        peopleAmount,
        budget,
        currency,
        participants,
      });

      if (closeForm) {
        closeForm();
      }
    }
  };

  const handleCloseClick = () => {
    if (closeForm) {
      closeForm();
    }
  };

  return (
    <div className="FormContainer AddEventFormContainer">
      <div className="FormTitle">Add event</div>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="FormInput AddEventFormInput"
          {...register("name", {
            required: "Please enter event name.",
            validate: {
              minLength: (v) =>
                v.length >= 3 || "Name must have at least 3 letters",
              matchPattern: (v) =>
                /^[a-zA-Z]+$/.test(v) || "Name must contain only letters",
            },
          })}
          placeholder="Name"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="name" />
        </small>
        <input
          className="FormInput AddEventFormInput"
          type="date"
          {...register("date", {
            required: "Please choose date.",
          })}
          placeholder="Date"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="date" />
        </small>
        <input
          className="FormInput AddEventFormInput"
          {...register("peopleAmount", {
            required: "Please enter people amount.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter a number",
            },
          })}
          placeholder="People amount"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="peopleAmount" />
        </small>
        <input
          className="FormInput AddEventFormInput"
          {...register("budget", {
            required: "Please enter budget.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter a number",
            },
          })}
          placeholder="Budget"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="budget" />
        </small>
        <input
          className="FormInput AddEventFormInput"
          {...register("currency", {
            required: "Please enter currency.",
            validate: {
              minLength: (v) =>
                v.length >= 1 || "Currency must have at least 1 letters",
              matchPattern: (v) =>
                /^[a-zA-Z]+$/.test(v) || "Currency must contain only letters",
            },
          })}
          placeholder="Currency"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="currency" />
        </small>
        <div className="FormAddEventPeople">
          <div className="FormAddEventPeopleHeaderContainer">
            <span className="FormAddEventPeopleTitle">Add people</span>
            <button
              className="FormAddEventPeopleAddButton"
              onClick={() => {
                append({
                  participantName: "",
                  participantSurname: "",
                  participantEmail: "",
                });
              }}
            >
              Add
            </button>
          </div>
          <div className="FormAddEventPeopleContentContainer">
            {fields.map((field, index) => {
              return (
                <div
                  className="FormAddEventPeopleInputsContentContainer"
                  key={field.id}
                >
                  <div className="FormAddEventPeopleInputContainer">
                    <input
                      className="FormInput FormAddEventPeopleInput"
                      {...register(`participants.${index}.participantName`, {
                        required: "Please enter name.",
                        validate: {
                          minLength: (v) =>
                            v.length >= 3 ||
                            "Name must have at least 3 letters",
                          matchPattern: (v) =>
                            /^[a-zA-Z]+$/.test(v) ||
                            "Name must contain only letters",
                        },
                      })}
                      placeholder="Name"
                    />
                  </div>
                  <div className="FormAddEventPeopleInputContainer">
                    <input
                      className="FormInput FormAddEventPeopleInput"
                      {...register(`participants.${index}.participantSurname`, {
                        required: "Please enter surname.",
                        validate: {
                          minLength: (v) =>
                            v.length >= 3 ||
                            "Surname must have at least 3 letters",
                          matchPattern: (v) =>
                            /^[a-zA-Z]+$/.test(v) ||
                            "Name must contain only letters",
                        },
                      })}
                      placeholder="Surname"
                    />
                  </div>
                  <div className="FormAddEventPeopleInputContainer">
                    <input
                      className="FormInput FormAddEventPeopleInput"
                      {...register(`participants.${index}.participantEmail`, {
                        required: "Please enter your email.",
                        validate: {
                          maxLength: (v) =>
                            v.length <= 50 ||
                            "The email should have at most 50 characters",
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address",
                        },
                      })}
                      placeholder="Email"
                    />
                  </div>
                  <button
                    className="FormAddEventPeopleDeleteButton"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="FormSubmitButtonContainer">
          <input className="FormSubmitButton" type="submit" value="AddEvent" />
          <input
            readOnly
            className="FormSubmitButton"
            onClick={handleCloseClick}
            value="Close"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;

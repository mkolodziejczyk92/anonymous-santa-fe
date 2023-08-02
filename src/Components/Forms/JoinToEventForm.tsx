import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "./Form.css";

type JoinToEventFormProps = {
  formCallback?: (data: JoinToEventFormDataType) => void;
  closeForm?: () => void;
};

export type JoinToEventFormDataType = {
  id: string;
  email: string;
  password: string;
};

const JoinToEventForm = ({ formCallback, closeForm }: JoinToEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      email: "",
      password: "",
    } as JoinToEventFormDataType,
  });

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
    const { id, email, password } = data;

    if (formCallback) {
      formCallback({ id, email, password });
    }
  };

  const handleCloseClick = () => {
    if (closeForm) {
      closeForm();
    }
  };

  return (
    <div className="FormContainer">
      <div className="FormTitle">Joint to event!</div>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <input className="FormInput" {...register("id", {})} placeholder="Id" />
        <input
          className="FormInput"
          {...register("email", {})}
          placeholder="Email"
        />
        <input
          className="FormInput"
          type="password"
          {...register("password", {})}
          placeholder="Password"
        />
        <div className="FormSubmitButtonContainer">
          <input className="FormSubmitButton" type="submit" value="Join" />
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

export default JoinToEventForm;

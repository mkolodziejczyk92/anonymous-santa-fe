import SignUpForm from "../Components/Forms/SignUpForm";
import image from "../Assets/Sign_up.png";

const SignUp = () => {
  return (
    <div className="Container">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
      <img src={image} alt="Sign Up"/>
      </h1>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignUp;

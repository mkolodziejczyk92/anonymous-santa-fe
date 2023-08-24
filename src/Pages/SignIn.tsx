import SignInForm from "../Components/Forms/SignInForm";
import image from "../Assets/Sign_in.png";

const SignIn = () => {
  return (
    <div className="Container">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
      <img src={image} alt="Sign In"/>
      </h1>
      <SignInForm></SignInForm>
    </div>
  );
};

export default SignIn;

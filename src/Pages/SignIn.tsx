import SignInForm from "../Components/Forms/SignInForm";

const SignIn = () => {
  return (
    <div className="Container">
      <h1 style={{ display: "flex", justifyContent: "center" }}>Sign In</h1>
      <SignInForm></SignInForm>
    </div>
  );
};

export default SignIn;

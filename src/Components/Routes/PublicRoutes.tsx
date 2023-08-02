import { Route, Routes } from "react-router";

import Home from "../../Pages/Home";
import SignIn from "../../Pages/SignIn";
import SignUp from "../../Pages/SignUp";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/signin" element={<SignIn></SignIn>} />
      <Route path="/signup" element={<SignUp></SignUp>} />
    </Routes>
  );
};

export default PublicRoutes;

import { Route, Routes } from "react-router";

import Home from "../../Pages/Home";
import Events from "../../Pages/Events";
import Profile from "../../Pages/Profile";

const SignInRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/events" element={<Events></Events>} />
      <Route path="/profile" element={<Profile></Profile>} />
    </Routes>
  );
};

export default SignInRoutes;

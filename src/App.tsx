import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import NavMenu from "./Components/NavMenu/NavMenu";
import { useAuth } from "./Context/Auth/AuthContextPovider";
import SignInRoutes from "./Components/Routes/SignInRoutes";
import PublicRoutes from "./Components/Routes/PublicRoutes";
import RoutesManager from "./Components/Routes/RoutesManager";

function App() {
  const { token } = useAuth();

  return (
    <div className="AppContainer">
      <Router>
        <>
          <NavMenu token={token} />
          <RoutesManager token={token} />
        </>
      </Router>
    </div>
  );
}

export default App;

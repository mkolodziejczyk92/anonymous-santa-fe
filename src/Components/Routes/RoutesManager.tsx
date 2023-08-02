import PublicRoutes from "./PublicRoutes";
import SignInRoutes from "./SignInRoutes";

const RoutesManager = ({ token }: { token: string }) => {
  return <>{token ? <SignInRoutes /> : <PublicRoutes />}</>;
};

export default RoutesManager;

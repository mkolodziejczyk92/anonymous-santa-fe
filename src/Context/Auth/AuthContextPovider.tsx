import {
  ReactNode,
  useReducer,
  createContext,
  useCallback,
  ReactElement,
  useContext,
} from "react";

export type AuthContextStateType = { token: string };

export const INITIAL_STATE: AuthContextStateType = {
  token: "",
};

enum AuthContextActionEnum {
  LOGIN = "auth/LOGIN",
  LOGIN_OUT = "auth/LOGIN_OUT",
}

type AuthContextActionType = {
  type: AuthContextActionEnum;
  payload?: AuthContextStateType;
};

export const authReducer = (
  state: AuthContextStateType,
  action: AuthContextActionType
): AuthContextStateType => {
  const { type, payload } = action;

  switch (type) {
    case AuthContextActionEnum.LOGIN:
      return {
        token: payload?.token ?? "",
      };
    case AuthContextActionEnum.LOGIN_OUT:
      return {
        token: "",
      };
    default:
      return state;
  }
};

type UseAuthContextType = {
  state: AuthContextStateType;
  logIn: (data: AuthContextStateType) => void;
  logOut: () => void;
};

const useAuthContext = (
  initState: AuthContextStateType
): UseAuthContextType => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const logIn = useCallback(
    (data: AuthContextStateType) =>
      dispatch({
        type: AuthContextActionEnum.LOGIN,
        payload: data,
      }),
    []
  );

  const logOut = useCallback(
    () =>
      dispatch({
        type: AuthContextActionEnum.LOGIN_OUT,
      }),
    []
  );

  return { state, logIn, logOut };
};

const initUseAuthContextState: UseAuthContextType = {
  state: INITIAL_STATE,
  logIn: (data: AuthContextStateType) => {},
  logOut: () => {},
};

export const AuthContext = createContext<UseAuthContextType>(
  initUseAuthContextState
);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const AuthContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  return (
    <AuthContext.Provider value={useAuthContext(INITIAL_STATE)}>
      {children}
    </AuthContext.Provider>
  );
};

type UseAuthHookType = {
  token: string;
  logIn: (data: AuthContextStateType) => void;
  logOut: () => void;
};

export const useAuth = (): UseAuthHookType => {
  const {
    state: { token },
    logIn,
    logOut,
  } = useContext(AuthContext);

  return { token, logIn, logOut };
};

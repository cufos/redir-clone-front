import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
// context
import { DispatchContext, StateContext } from "./context";

// reducer
import { reducer } from "./reducer";

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await axios.get("/auth/me");
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "STOP_LOADING" });
      }
    }

    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

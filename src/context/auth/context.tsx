import { createContext } from "react";
// Custom types
import { State } from "./types";

export const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
});

export const DispatchContext = createContext(null);

// custom types
import { User } from "../../types";

export interface State {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

import types from "./types";

interface State {
  isLoggedIn: boolean;
}

interface Action {
  type: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;

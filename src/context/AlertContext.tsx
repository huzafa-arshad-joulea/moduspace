import { AlertColor } from "@mui/material";
import { createContext, useReducer } from "react";

enum Action {
  UPDATE = "update",
}

export interface IAlertContextState {
  type?: Action;
  show?: boolean;
  message?: string;
  severity?: AlertColor;
  dispatchUpdateAlert?: any;
}

const initialState: IAlertContextState = {
  show: false,
  message: "",
};

const AlertContext = createContext<IAlertContextState>({});

function reducer(state: IAlertContextState, action: IAlertContextState) {
  switch (action.type) {
    case Action.UPDATE:
      return {
        ...state,
        ...action,
      };

    default:
      return state;
  }
}

function AlertProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function dispatchUpdateAlert(value: IAlertContextState) {
    dispatch({
      type: Action.UPDATE,
      ...value,
    });
  }

  return (
    <AlertContext.Provider
      value={{
        ...state,
        dispatchUpdateAlert,
      }}
      {...props}
    />
  );
}

export { AlertContext, AlertProvider };

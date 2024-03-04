import { createContext, useReducer } from "react";

enum Action {
  UPDATE = "update",
}

export interface IExampleContextState {
  type?: Action;
  dispatchUpdateExample?: any;
}

const initialState: IExampleContextState = {};

const ExampleContext = createContext<IExampleContextState>({});

function reducer(state: IExampleContextState, action: IExampleContextState) {
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

function ExampleProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function dispatchUpdateExample(value: IExampleContextState) {
    dispatch({
      type: Action.UPDATE,
      ...value,
    });
  }

  return (
    <ExampleContext.Provider
      value={{
        ...state,
        dispatchUpdateExample,
      }}
      {...props}
    />
  );
}

export { ExampleContext, ExampleProvider };

import i18n from "i18n";
import { createContext, useReducer } from "react";

enum Action {
  UPDATE = "update",
}

export interface ILocaleContextState {
  type?: Action;
  lang: string;
  dispatchUpdateLang?: any;
}

const initialState: ILocaleContextState = {
  lang: localStorage.getItem("lang") ?? "en",
};

const LocaleContext = createContext<ILocaleContextState>(initialState);

function reducer(state: ILocaleContextState, action: ILocaleContextState) {
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

function LocaleProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function dispatchUpdateLang(value: ILocaleContextState) {
    dispatch({
      type: Action.UPDATE,
      ...value,
    });
    localStorage.setItem("lang", value.lang);
    if (i18n.locale !== value.lang) window.location.reload();
  }

  return (
    <LocaleContext.Provider
      value={{
        ...state,
        dispatchUpdateLang,
      }}
      {...props}
    />
  );
}

export { LocaleContext, LocaleProvider };

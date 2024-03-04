import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CentralContextProvider from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <CentralContextProvider>
    <App />
  </CentralContextProvider>,
);

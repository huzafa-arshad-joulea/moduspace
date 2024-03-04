import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import routes from "routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "layouts/theme";
import Loadable from "react-loadable";
import { ToastContainer } from "react-toastify";
import registerFetchInterceptor from "registerInterceptor";
import "react-toastify/dist/ReactToastify.css";
import "normalize.css";

const App = () => {
  type RouteType = {
    path: string;
    component: React.ComponentType<unknown> & Loadable.LoadableComponent;
  };

  const getRoutes = (allRoutes: RouteType[]) =>
    allRoutes.map((route) => {
      return <Route path={route.path} Component={route.component} />;
    });

  const router = createBrowserRouter(
    createRoutesFromElements(getRoutes(routes))
  );

  useEffect(() => {
    registerFetchInterceptor();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;

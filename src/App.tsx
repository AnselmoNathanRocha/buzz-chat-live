import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { RouterProvider } from "react-router-dom";
import { appRoutes, authRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import { ContainerApp, GlobalStyles } from "./styles/GlobalStyles";
import { AppProvider } from "./context";

dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    setLogged(token != null ? true : false);
  }, []);

  return (
    <ContainerApp>
      <AppProvider>
        <GlobalStyles />

        <RouterProvider router={logged ? appRoutes : authRoutes} />
      </AppProvider>

      <ToastContainer theme="colored" position="bottom-right" />
    </ContainerApp>
  )
}
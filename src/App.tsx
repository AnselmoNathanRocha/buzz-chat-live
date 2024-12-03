import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { RouterProvider } from "react-router-dom";
import { appRoutes, authRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContainerApp, GlobalStyles } from "./styles/GlobalStyles";
import { AppProvider } from "./context";
import { verifyTokenService } from "./services/verifyToken-service";

dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await verifyTokenService.get();

        if (response?.message === "Token válido.") {
          setLogged(true);
        }
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        setLogged(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('expiresIn');
      }
    };

    checkTokenValidity();
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

import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./auth";
import { theme } from "@/styles/theme";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    );
};

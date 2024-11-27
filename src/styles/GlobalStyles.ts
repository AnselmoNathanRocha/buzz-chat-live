import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: .2s ease-in-out;
    font-family: "Work Sans", sans-serif;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    display: flex;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  input, button {
    outline: none;
    border: none;
    -webkit-text-size-adjust: none;
  }

  input[type="date"] {
    width: 100%;
    box-sizing: border-box;

    &:disabled {
      width: 100% !important;
    }
  }

  button {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #00000022;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
  }
`;

// Global
export const EmptyMessage = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 500;
  opacity: 0.8;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const BackButton = styled.button`
  background: none;
  font-size: 24px;
  color: #333;
  position: absolute;
  top: 16px;
  left: 16px;

  &:hover {
    color: #007bff;
  }
`;

// App.ts
export const ContainerApp = styled.div`
  width: 100%;
  height: 100%;
`;

// Login e SignUp
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const FormBox = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  font-weight: 600;
  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const LinkCustom = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const TextLink = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

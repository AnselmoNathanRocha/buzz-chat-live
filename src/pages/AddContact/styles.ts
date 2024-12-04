import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const ContainerInput = styled.div`
  width: clamp(100px, 100%, 400px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  & label {
    display: block;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  & input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

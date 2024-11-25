import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const UserStatus = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  & .status {
    font-size: 12px;
    color: green;
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Message = styled.div<{ $isSent: boolean }>`
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ $isSent }) => ($isSent ? "#dcf8c6" : "#f1f0f0")};
  align-self: ${({ $isSent }) => ($isSent ? "flex-end" : "flex-start")};
  max-width: 80%;
  width: fit-content;
`;

export const InputContainer = styled.form`
  display: flex;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px;
  font-size: 16px;
`;

export const SendButton = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

import styled, { css } from "styled-components";

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
  max-width: 70%;
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.5;
  background-color: ${({ $isSent, theme }) =>
    $isSent ? theme.colors.primary : theme.colors.secondary};
  color: ${({ $isSent, theme }) =>
    $isSent ? theme.colors.background : theme.colors.background};
  align-self: ${({ $isSent }) => ($isSent ? "flex-end" : "flex-start")};

  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;

  ${({ $isSent }) =>
    $isSent
      ? css`
          border-top-right-radius: 0;
        `
      : css`
          border-top-left-radius: 0;
        `}
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
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

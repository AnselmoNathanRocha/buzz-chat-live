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

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 30px;
`;

export const SearchGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  & input {
    width: 100%;
    padding: 10px 40px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
    font-size: 16px;
  }

  & svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ConversationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
`;

export const MenuButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  svg {
    margin-right: 4px;
  }
`;

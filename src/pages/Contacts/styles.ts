import styled from "styled-components";

export const FloatingButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  position: fixed;
  bottom: 20px;
  right: 20px;

  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const TextDetailed = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.background};
`;

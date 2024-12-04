import styled from "styled-components";

export const MenuContainer = styled.div`
  position: relative;
`;

export const ButtonOpen = styled.button`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.background};
  background-color: transparent;
`;

export const ContainerOptions = styled.div<{
  $isOpen: boolean;
  $options: number;
}>`
  width: 180px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColorBlack};
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  transition: height .2s ease-in-out, border-width .01s ease-in-out;

  border-width: ${(props) => (props.$isOpen ? "1px" : "0px")};
  height: ${(props) => (props.$isOpen ? `${props.$options * 35}px` : "0px")};

  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 100;
`;

export const MenuItem = styled.button`
  width: 100%;
  height: 35px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  padding: 10px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

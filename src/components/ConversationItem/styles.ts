import styled from "styled-components";

export const ItemContainer = styled.li<{
  $isSelected: boolean;
  $isHovered: boolean;
}>`
  position: relative;
  user-select: none;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, margin-left 0.3s;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.selectedBackground : "transparent"};
  border-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.selectedBorder : theme.colors.borderColor};

  margin-left: ${({ $isSelected, $isHovered }) =>
    $isSelected || $isHovered ? "40px" : "0"};
  transition: margin-left 0.3s;
  ${({ $isHovered, $isSelected }) =>
    !$isHovered && !$isSelected && "transition-delay: .5s;"}

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const CheckboxContainer = styled.span<{
  $isHovered: boolean;
  $isSelected: boolean;
}>`
  position: absolute;
  left: -35px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: green;
  cursor: pointer;

  opacity: ${({ $isHovered, $isSelected }) =>
    $isHovered || $isSelected ? 1 : 0};
  transition: opacity 0.3s;
  ${({ $isHovered, $isSelected }) =>
    !$isHovered && !$isSelected && "transition-delay: .5s;"}
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LastMessage = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.5;
`;

export const ReadIcon = styled.span<{ $isRead: boolean }>`
  font-size: 14px;
  color: ${({ $isRead }) => ($isRead ? "green" : "gray")};
`;

export const Timestamp = styled.span`
  margin-right: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #00000055;
  display: inline-block;
  vertical-align: middle;
`;

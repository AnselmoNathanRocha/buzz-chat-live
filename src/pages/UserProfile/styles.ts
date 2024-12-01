import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
  position: relative;

  & > h2 {
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-left: 10px;
  }

  & > svg {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textPrimary};
    position: absolute;
    left: 0;
  }
`;

export const ProfilePicture = styled.div`
  width: 220px;
  height: 220px;
  margin-bottom: 20px;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const InfoContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const Name = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 5px;
`;

export const Status = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-top: 20px;
`;

export const OptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  & svg {
    font-size: 18px;
  }
`;

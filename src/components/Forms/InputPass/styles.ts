import styled from "styled-components";

export const InputBox = styled.div`
  width: 100%;
  min-width: 250px;
  height: 45px;
  margin: 8px 0 3px;
  border-radius: 3px;
  position: relative;
  align-self: center;
`;

export const InputText = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 1rem;
  padding: 0 15px;

  &:focus ~ Label,
  &:not(:placeholder-shown) ~ Label {
    transform: translate(-5px, -30px);
    font-size: 0.8rem;
    padding: 0 5px;
    background-color: #fff;
  }
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const Icon = styled.svg`
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
`;

export const RightIcon = styled.div<{ $colorIcon?: string }>`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  background-color: transparent;
  display: flex;

  &:hover ${Icon} {
    color: ${(props) =>
      props.$colorIcon ? props.$colorIcon : props.theme.colors.secondary};
  }
  
  ${Icon} {
    color: ${(props) =>
      props.$colorIcon ? props.$colorIcon : props.theme.colors.primary};
  }
`;

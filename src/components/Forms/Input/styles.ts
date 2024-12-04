import styled from "styled-components";

export const FloatingLabelStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 40px;
  color: ${({ theme }) => theme.colors.gray};
  transform: translate(0, -50%);
  user-select: none;
  cursor: text;
`;

export const InputText = styled.input<{
  $hasIcone: boolean;
  $borderStyle?: string;
  $borderRadius?: string;
}>`
  width: 100%;
  height: 40px;
  padding: 8px 12px 8px ${(props) => (props.$hasIcone ? "40px" : "12px")};
  font-size: 16px;
  font-weight: 400;
  line-height: 14.08px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: transparent;

  border: ${(props) =>
    props.$borderStyle
      ? props.$borderStyle
      : `1px solid ${props.theme.colors.borderColorBlack}`};
  border-radius: ${(props) =>
    props.$borderRadius ? props.$borderRadius : "4px"};

  &:disabled {
    background-color: #00000022;
  }

  &:not(:placeholder-shown)
    + ${FloatingLabelStyle},
    &:focus
    + ${FloatingLabelStyle} {
    left: 20px;
    top: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: #fff;
    padding: 0 5px;
    border-radius: 5px;
  }
`;

export const FadeInput = styled.div`
  position: absolute;
  inset: 0;
  background-color: #00000066;
  border-radius: 4px;

  &[data-visible="true"] {
    display: none;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.42px;
`;

export const InputBox = styled.div<{
  $color?: string;
  $borderStyle?: string;
  $borderRadius?: string;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding-bottom: 10px;

  &[data-invalid="true"] ${InputText} {
    border-color: #ff7777;
  }

  ${InputText} {
    border: ${(props) =>
      props.$borderStyle
        ? props.$borderStyle
        : `1px solid ${props.theme.colors.borderColorBlack}`};
    border-radius: ${(props) =>
      props.$borderRadius
        ? props.$borderRadius
        : "4px"};
    color: ${(props) =>
      props.$color ? props.$color : props.theme.colors.textPrimary};
  }
`;

export const ContentInput = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const LeftIcon = styled.div<{ $colorIcon?: string }>`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$colorIcon ? props.$colorIcon : props.theme.colors.primary};
`;

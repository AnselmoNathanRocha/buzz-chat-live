import { InputHTMLAttributes, ReactNode, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { RightIcon } from "../InputPass/styles";
import { ContentInput, FadeInput, InputBox, InputText, Label, FloatingLabelStyle, LeftIcon } from "./styles";
import { MaskType, masks } from "@/utils/masks";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  mask?: MaskType;
  name: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  floatingLabel?: string;
  permitNegativeValues?: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
  color?: string;
  borderColor?: string;
  colorIcon?: string;
}

export function Input({
  id,
  name,
  mask,
  leftIcon,
  rightIcon,
  floatingLabel,
  permitNegativeValues,
  showErrorMessage = true,
  errorMessage,
  placeholder,
  color,
  borderColor,
  colorIcon,
  disabled,
  ...props
}: InputProps) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  const additionalProps: InputHTMLAttributes<HTMLInputElement> = {};

  if (props.type === "number" && !permitNegativeValues) {
    additionalProps.min = "0";
  }

  const handleInputMask = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      if (mask && typeof masks[mask] === "function") {
        masks[mask](event);
      }
    },
    [mask]
  );

  useEffect(() => {
    const currentValue = getValues(name) || "";
    if (!mask || currentValue === undefined) return;

    const maskedValue = masks[mask](currentValue.toString());
    setValue(name, maskedValue, { shouldDirty: false, shouldTouch: false });
  }, [mask, name, setValue, getValues]);

  return (
    <InputBox
      data-invalid={!!fieldError}
      $color={color}
      $borderColor={borderColor}
    >
      <Label htmlFor={id ?? name}>{props.label}</Label>

      <ContentInput>
        {leftIcon && <LeftIcon $colorIcon={colorIcon}>{leftIcon}</LeftIcon>}
        <FadeInput data-visible={!disabled} />

        <InputText
          id={id ?? name}
          onInput={handleInputMask}
          disabled={disabled}
          $hasIcone={!!leftIcon}
          {...register(name, {
            valueAsNumber: props.type === "number" ? true : undefined,
          })}
          {...props}
          {...additionalProps}
          placeholder={placeholder ? placeholder : ""}
        />

        <FloatingLabelStyle>
          {floatingLabel}
        </FloatingLabelStyle>

        {rightIcon && <RightIcon $colorIcon={colorIcon}>{rightIcon}</RightIcon>}
      </ContentInput>

      {showErrorMessage && (
        <ErrorMessage field={name} errorMessage={errorMessage} />
      )}
    </InputBox>
  );
}

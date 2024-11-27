import { FormHTMLAttributes } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

export interface FormRootProps<T extends FieldValues>
  extends FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T>;
  useDefaultStyle?: boolean;
}

export function FormRoot<T extends FieldValues>({
  form,
  useDefaultStyle = true,
  ...props
}: FormRootProps<T>) {
  return (
    <FormProvider {...form}>
      <FormContainer
        noValidate
        autoComplete="off"
        {...props}
        data-default-style={useDefaultStyle}
      />
    </FormProvider>
  );
}

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  &[data-default-style="true"] {
    justify-content: center;
    align-items: center;
    gap: 5px;

    width: 100%;
  }
`;

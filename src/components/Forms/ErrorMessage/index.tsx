import { useFormContext } from "react-hook-form";
import { ErrorText } from "./styles";

interface ErrorMessageProps {
  field: string;
  errorMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export function ErrorMessage({ field, errorMessage }: ErrorMessageProps) {
  const formContext = useFormContext();
  if (!formContext) return <ErrorText>{errorMessage}</ErrorText>;

  const {
    formState: { errors },
  } = formContext;

  const message = errorMessage || get(errors, field)?.message?.toString();

  if (!message) {
    return null;
  }

  return <ErrorText>{message}</ErrorText>;
}

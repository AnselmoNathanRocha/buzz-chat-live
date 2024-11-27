import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Input, InputProps } from "../Input";
import { Icon } from "./styles";

type InputPassProps = Omit<InputProps, "rightIcon" | "type">;

export function InputPass({ ...props }: InputPassProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Input
      {...props}
      type={passwordVisible ? "text" : "password"}
      rightIcon={
        <Icon
          as={passwordVisible ? PiEyeBold : PiEyeClosedBold}
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      }
    />
  );
}


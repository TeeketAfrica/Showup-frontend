import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
}

const PhoneInputField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>((props, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      className={cn("h-12", props.className)}
    />
  );
});

PhoneInputField.displayName = "PhoneInputField";

export function ShadPhoneInput({
  value,
  onChange,
  className,
}: PhoneInputProps) {
  return (
    <PhoneInput
      international
      defaultCountry="NG"
      value={value}
      onChange={onChange}
      inputComponent={PhoneInputField}
      className={className}
    />
  );
}
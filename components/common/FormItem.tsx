import {
  FormControl,
  FormItem as FormItemPrimitive,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label?: string;
  type?: string;
  className?: string;
  required?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  autoComplete?: string;
  countryCodeStyle?: string;
}

export default function FormItem({
  label = "",
  type = "text",
  className,
  required,
  containerClassName,
  inputClassName,
  autoComplete,
  countryCodeStyle,
  ...field
}: FormFieldProps) {
  return (
    <FormItemPrimitive className={cn("w-full", containerClassName)}>
      <FormControl>
        <CustomInput
          {...field}
          type={type}
          label={label}
          className={className}
          inputClassName={inputClassName}
          placeholder={label}
          required={required}
          autoComplete={autoComplete}
          countryCodeStyle={countryCodeStyle}
        />
      </FormControl>
      <FormMessage />
    </FormItemPrimitive>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import EyeSlashIcon from "../icons/EyeSlashIcon";
import EyeIcon from "../icons/EyeIcon";
import { useTranslations } from "next-intl";

// Input props with more specific types
interface CustomInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "size"
  > {
  label: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  hint?: string;
  phoneCountryCode?: string;
  size?: "sm" | "md" | "lg";
  status?: "default" | "error" | "success";
  showSuccessState?: boolean;
  id?: string;
  autoComplete?: string;
  countryCodeStyle?: string;
}

// CustomInput component with forwardRef for better integration with form libraries
export default function CustomInput({
  label,
  required = true,
  type = "text",
  className,
  inputClassName,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  phoneCountryCode = "+965",
  size = "md",
  status = "default",
  showSuccessState = false,
  disabled,
  id,
  autoComplete,
  countryCodeStyle,
  ...props
}: CustomInputProps) {
  const [hidePassword, setHidePassword] = useState(true);
  const inputId = id || `input-${label.toLowerCase().replace(/\s/g, "-")}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const t = useTranslations("orders");

  // Determine input state for styling
  const isError = error || status === "error";
  const isSuccess =
    !isError &&
    (status === "success" || (showSuccessState && value && value.length > 0));

  // Map type to HTML type
  const effectiveType = type === "password" && !hidePassword ? "text" : type;

  // Size classes
  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-12 text-base",
    lg: "h-14 text-lg",
  };

  // Status classes
  const statusClasses = {
    default:
      "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
    error:
      "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200",
    success:
      "border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200",
  };

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <label htmlFor={inputId} className="text-gray-700">
            {label}
            {required && <span className="ml-1">*</span>}
          </label>
          {!required && (
            <span className="ml-1 text-sm text-custom-black">
              ({t("optional")})
            </span>
          )}
        </div>
        {hint && !error && (
          <span id={hintId} className="text-xs text-gray-500">
            {hint}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <input
          id={inputId}
          className={cn(
            "w-full px-4 rounded-lg bg-white transition-colors duration-200",
            "placeholder:text-gray-400 focus:outline-none",
            sizeClasses[size],
            isError
              ? statusClasses.error
              : isSuccess
              ? statusClasses.success
              : statusClasses.default,
            {
              "ltr:pl-20 rtl:pr-20": type === "phone",
              "ltr:pr-12 rtl:pl-12": type === "password",
              "bg-gray-100": disabled,
              "cursor-not-allowed opacity-75": disabled,
            },
            inputClassName
          )}
          value={value || ""}
          onChange={(e) => onChangeText?.(e.target.value)}
          placeholder={placeholder}
          type={effectiveType}
          aria-errormessage={error ? errorId : undefined}
          aria-describedby={hint && !error ? hintId : undefined}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={type === "phone" ? 8 : undefined}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-1/2 ltr:right-3 rtl:left-3 -translate-y-1/2 p-2"
            onClick={() => setHidePassword(!hidePassword)}
            aria-label={hidePassword ? "Show password" : "Hide password"}
            tabIndex={0}
          >
            {hidePassword ? (
              <EyeSlashIcon className="h-5 w-5 text-custom-black" />
            ) : (
              <EyeIcon className="h-5 w-5 text-custom-black" />
            )}
          </button>
        )}
        {type === "phone" && (
          <span
            className={cn(
              "absolute top-1/2 ltr:left-3 rtl:right-3 -translate-y-1/2 text-gray-700 font-medium",
              countryCodeStyle
            )}
          >
            {phoneCountryCode} |
          </span>
        )}
        {isSuccess && !type.match(/password|phone/) && (
          <svg
            className="absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {error && (
        <div className="mt-1 text-sm text-red-500" id={errorId}>
          {error}
        </div>
      )}
    </div>
  );
}

"use client";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

// Button variants (includes text styles)
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors overflow-hidden focus:outline-none gap-2 cursor-pointer relative",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        gray: "bg-customGray-500 text-black hover:bg-customGray-400",
        white: "bg-white text-primary hover:bg-gray-100 border border-gray-300",
      },
      rounded: {
        default: "rounded-[10px]",
        full: "rounded-full",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      rounded: "default",
      disabled: false,
    },
  }
);

// Button props
interface CustomButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// CustomButton component
export default function CustomButton({
  children,
  size,
  variant,
  rounded,
  disabled,
  className,
  onClick,
  ariaLabel,
  loading = false,
  leftIcon,
  rightIcon,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant, rounded, disabled }),
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="absolute inset-0 bg-white/30 flex-center cursor-not-allowed">
          <Loader2 className="animate-spin" />
        </span>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}

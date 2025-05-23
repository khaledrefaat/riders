import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center  text-white",
  {
    variants: {
      variant: {
        secondary: "bg-secondary",
        danger: "bg-customRed",
        blueSky: "bg-blueSky text-primary",
      },
      rounded: {
        true: "rounded-[5px]",
        false: "",
      },
      size: {
        lg: "py-2 px-4 text-xl",
        md: "py-1.5 px-3 text-lg",
        sm: "py-1 px-2",
        xs: "p-1",
      },
    },
    defaultVariants: {
      variant: "secondary",
      rounded: false,
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export default function Badge({
  className,
  variant,
  rounded,
  size,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, rounded, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva("w-full bg-customGray-450", {
  variants: {
    size: {
      sm: "h-[0.5px]",
      md: "h-[1px]",
      lg: "h-[6px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SeparatorProps extends VariantProps<typeof separatorVariants> {
  className?: string;
}

export default function Separator({ className, size }: SeparatorProps) {
  return <div className={cn(separatorVariants({ size }), className)} />;
}

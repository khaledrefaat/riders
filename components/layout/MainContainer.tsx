import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function MainContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "min-h-[80vh] pb-32 md:pb-0 md:bg-customGray-500 relative",
        className
      )}
    >
      {children}
    </main>
  );
}

import { cn } from "@/lib/utils";

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function ChevronDownIcon({
  className = "",
  height = "9",
  width = "16",
  ...props
}: ChevronDownIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 9"
      strokeWidth={1.5}
      stroke="currentColor"
      height={height}
      width={width}
      className={cn("text-primary", className)}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 1L8 8L1 1" />
    </svg>
  );
}

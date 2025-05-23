import { cn } from "@/lib/utils";

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function CloseIcon({
  className = "",
  height = "27",
  width = "27",
  ...props
}: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 27"
      strokeWidth={3}
      stroke="currentColor"
      height={height}
      width={width}
      className={cn("text-primary", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 25L25 2M2 2L25 25"
      />
    </svg>
  );
}

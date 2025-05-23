import { cn } from "@/lib/utils";

interface CheckMarkIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function CheckMarkIcon({
  className = "",
  height = "26",
  width = "27",
  ...props
}: CheckMarkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 26"
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
        d="M2 14.2222L11.2 24L25 2"
      />
    </svg>
  );
}

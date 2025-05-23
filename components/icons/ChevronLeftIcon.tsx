import { cn } from "@/lib/utils";

interface ChevronLeftIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function ChevronLeftIcon({
  className = "",
  height = "18",
  width = "10",
  ...props
}: ChevronLeftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 18"
      strokeWidth={1.5}
      stroke="currentColor"
      height={height}
      width={width}
      className={cn("text-primary", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 16.4492L1 8.72478L8.5 1.00034"
      />
    </svg>
  );
}

import { cn } from "@/lib/utils";

interface ClockIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function ClockIcon({
  className = "",
  height = "24",
  width = "24",
  ...props
}: ClockIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
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
        fill="currentColor"
        d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM16 13H12C11.448 13 11 12.553 11 12V6C11 5.447 11.448 5 12 5C12.552 5 13 5.447 13 6V11H16C16.553 11 17 11.447 17 12C17 12.553 16.553 13 16 13Z"
      />
    </svg>
  );
}

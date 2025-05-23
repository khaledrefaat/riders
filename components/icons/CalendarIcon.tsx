import { cn } from "@/lib/utils";

interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function CalendarIcon({
  className = "",
  height = "15",
  width = "15",
  ...props
}: CalendarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      strokeWidth={1.5}
      height={height}
      width={width}
      className={cn("text-primary", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        d="M0 5V4.375C0 2.65188 1.40188 1.25 3.125 1.25H3.75V0.625C3.75 0.28 4.02938 0 4.375 0C4.72062 0 5 0.28 5 0.625V1.25H10V0.625C10 0.28 10.2794 0 10.625 0C10.9706 0 11.25 0.28 11.25 0.625V1.25H11.875C13.5981 1.25 15 2.65188 15 4.375V5H0ZM15 6.25V11.875C15 13.5981 13.5981 15 11.875 15H3.125C1.40188 15 0 13.5981 0 11.875V6.25H15ZM11.145 8.22C10.905 7.97188 10.51 7.96438 10.2612 8.20375L7.29 11.0675C7.055 11.3025 6.66063 11.32 6.39063 11.0512L4.96688 9.72812C4.715 9.49375 4.32 9.50688 4.08375 9.76062C3.84875 10.0131 3.86313 10.4088 4.11625 10.6438L5.52375 11.9513C5.8775 12.3056 6.34875 12.5006 6.84937 12.5006C7.35 12.5006 7.82188 12.3056 8.16687 11.9594L11.1294 9.10438C11.3775 8.865 11.385 8.46813 11.145 8.22Z"
      />
    </svg>
  );
}

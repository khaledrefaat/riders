import { cn } from "@/lib/utils";

interface FormIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function FormIcon({
  className = "",
  height = "22",
  width = "25",
  ...props
}: FormIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 22"
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
        d="M19.5 0H5.5C2.743 0 0.5 2.243 0.5 5V17C0.5 19.757 2.743 22 5.5 22H19.5C22.257 22 24.5 19.757 24.5 17V5C24.5 2.243 22.257 0 19.5 0ZM7 17.5C6.172 17.5 5.5 16.828 5.5 16C5.5 15.172 6.172 14.5 7 14.5C7.828 14.5 8.5 15.172 8.5 16C8.5 16.828 7.828 17.5 7 17.5ZM7 12.5C6.172 12.5 5.5 11.828 5.5 11C5.5 10.172 6.172 9.5 7 9.5C7.828 9.5 8.5 10.172 8.5 11C8.5 11.828 7.828 12.5 7 12.5ZM7 7.5C6.172 7.5 5.5 6.828 5.5 6C5.5 5.172 6.172 4.5 7 4.5C7.828 4.5 8.5 5.172 8.5 6C8.5 6.828 7.828 7.5 7 7.5ZM18.5 17H11.5C10.948 17 10.5 16.552 10.5 16C10.5 15.448 10.948 15 11.5 15H18.5C19.052 15 19.5 15.448 19.5 16C19.5 16.552 19.052 17 18.5 17ZM18.5 12H11.5C10.948 12 10.5 11.552 10.5 11C10.5 10.448 10.948 10 11.5 10H18.5C19.052 10 19.5 10.448 19.5 11C19.5 11.552 19.052 12 18.5 12ZM18.5 7H11.5C10.948 7 10.5 6.552 10.5 6C10.5 5.448 10.948 5 11.5 5H18.5C19.052 5 19.5 5.448 19.5 6C19.5 6.552 19.052 7 18.5 7Z"
      />
    </svg>
  );
}

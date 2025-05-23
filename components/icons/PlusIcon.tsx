import { cn } from "@/lib/utils"; // Assuming cn is in @/lib/utils

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function PlusIcon({
  className = "",
  height = "20",
  width = "19",
  ...props
}: PlusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 20"
      fill="none"
      className={cn("text-white", className)} // Default color '#FFFFFF' mapped to "text-white"
      {...props}
    >
      <path
        d="M18.2084 9.1667H10.2917V0.833322C10.2917 0.373087 9.93726 0 9.50004 0C9.06281 0 8.70838 0.373087 8.70838 0.833322V9.16666H0.791657C0.354433 9.1667 0 9.53978 0 10C0 10.4603 0.354433 10.8333 0.791657 10.8333H8.70834V19.1667C8.70834 19.6269 9.06278 20 9.5 20C9.93722 20 10.2917 19.6269 10.2917 19.1667V10.8333H18.2083C18.6456 10.8333 19 10.4603 19 10C19.0001 9.53978 18.6456 9.1667 18.2084 9.1667Z"
        fill="currentColor" // Changed from {color} to currentColor
      />
    </svg>
  );
}

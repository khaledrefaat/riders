import { cn } from "@/lib/utils";

interface LocationPinIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

export default function LocationPinIcon({
  width = 12,
  height = 15,
  className = "",
  ...props
}: LocationPinIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 15"
      fill="none"
      className={cn("text-primary", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.66527 14.8907C5.68724 14.9037 5.7045 14.9137 5.71673 14.9207L5.73704 14.9322C5.89912 15.0229 6.10019 15.0222 6.26243 14.9325L6.28327 14.9207C6.2955 14.9137 6.31276 14.9037 6.33473 14.8907C6.37866 14.8648 6.44144 14.827 6.52036 14.7775C6.67816 14.6785 6.90091 14.5326 7.16699 14.3411C7.69825 13.9588 8.40709 13.3917 9.11749 12.6508C10.5314 11.1762 12 8.96076 12 6.11155C12 2.73623 9.31371 0 6 0C2.68629 0 0 2.73623 0 6.11155C0 8.96076 1.4686 11.1762 2.88251 12.6508C3.59291 13.3917 4.30175 13.9588 4.83301 14.3411C5.09909 14.5326 5.32184 14.6785 5.47964 14.7775C5.55856 14.827 5.62134 14.8648 5.66527 14.8907ZM6 8.33393C7.20499 8.33393 8.18182 7.33893 8.18182 6.11155C8.18182 4.88416 7.20499 3.88917 6 3.88917C4.79502 3.88917 3.81818 4.88416 3.81818 6.11155C3.81818 7.33893 4.79502 8.33393 6 8.33393Z"
        fill="currentColor"
      />
    </svg>
  );
}

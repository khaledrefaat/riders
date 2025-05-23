import { cn } from "@/lib/utils";

interface CreditCardIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function CreditCardIcon({
  className = "",
  height = "18",
  width = "23",
  ...props
}: CreditCardIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 23 18"
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
        d="M18.2083 0H4.79167C3.5213 0.0015217 2.30341 0.506845 1.40513 1.40513C0.506845 2.30341 0.0015217 3.5213 0 4.79167H23C22.9985 3.5213 22.4932 2.30341 21.5949 1.40513C20.6966 0.506845 19.4787 0.0015217 18.2083 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        d="M0 12.458C0.0015217 13.7284 0.506845 14.9463 1.40513 15.8445C2.30341 16.7428 3.5213 17.2482 4.79167 17.2497H18.2083C19.4787 17.2482 20.6966 16.7428 21.5949 15.8445C22.4932 14.9463 22.9985 13.7284 23 12.458V6.70801H0V12.458ZM6.70833 11.9788C6.70833 12.2632 6.62403 12.5411 6.46607 12.7775C6.30812 13.0139 6.08361 13.1981 5.82094 13.3069C5.55827 13.4157 5.26924 13.4442 4.99039 13.3887C4.71154 13.3333 4.45541 13.1963 4.25437 12.9953C4.05333 12.7943 3.91642 12.5381 3.86095 12.2593C3.80549 11.9804 3.83396 11.6914 3.94276 11.4287C4.05156 11.1661 4.23581 10.9416 4.4722 10.7836C4.7086 10.6256 4.98652 10.5413 5.27083 10.5413C5.65208 10.5413 6.01772 10.6928 6.2873 10.9624C6.55688 11.232 6.70833 11.5976 6.70833 11.9788Z"
      />
    </svg>
  );
}

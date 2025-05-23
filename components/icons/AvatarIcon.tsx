import { cn } from "@/lib/utils";

interface AvatarIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function AvatarIcon({
  className = "",
  height = "22",
  width = "22",
  ...props
}: AvatarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
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
        d="M2.75 5.5C2.75 2.46675 5.21767 0 8.25 0C11.2823 0 13.75 2.46675 13.75 5.5C13.75 8.53325 11.2833 11 8.25 11C5.21675 11 2.75 8.53325 2.75 5.5ZM22 16.5C22 19.5378 19.5378 22 16.5 22C13.4622 22 11 19.5378 11 16.5C11 13.4622 13.4622 11 16.5 11C19.5378 11 22 13.4622 22 16.5ZM19.9027 14.9398C19.5516 14.5741 18.9704 14.564 18.6065 14.9132L16.1196 17.3186C15.9885 17.4478 15.7722 17.4506 15.6411 17.3204L14.3999 16.1003C14.0369 15.7447 13.4576 15.7511 13.1038 16.1132C12.749 16.4753 12.7545 17.0546 13.1166 17.4093L14.3577 18.6303C14.7794 19.0419 15.3313 19.2482 15.8822 19.2482C16.4331 19.2482 16.9831 19.0419 17.3974 18.6331L19.8752 16.2369C20.24 15.8858 20.2519 15.3056 19.9018 14.9408L19.9027 14.9398ZM9.16667 16.5C9.16667 15.246 9.48292 14.0662 10.0375 13.0341C9.46092 12.9058 8.86417 12.8333 8.25 12.8333C3.707 12.8333 0.00916821 16.5257 1.54538e-06 21.0678C-0.000915121 21.5783 0.406085 22 0.916668 22H11.6609C10.1347 20.6562 9.16667 18.6936 9.16667 16.5Z"
      />
    </svg>
  );
}

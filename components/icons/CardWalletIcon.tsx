import { cn } from "@/lib/utils";

interface CardWalletIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function CardWalletIcon({
  className = "",
  height = "16",
  width = "19",
  ...props
}: CardWalletIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 19 16"
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
        d="M0.0224797 2.33354C0.795446 1.71105 1.81086 1.33333 2.92297 1.33333H16.0768C17.1889 1.33333 18.2043 1.71106 18.9773 2.33354C18.7976 1.018 17.5675 0 16.0768 0H2.92297C1.43226 0 0.202183 1.018 0.0224797 2.33354Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        d="M0.0224798 5.00021C0.795447 4.37772 1.81086 4 2.92297 4H16.0768C17.1889 4 18.2043 4.37772 18.9773 5.00021C18.7976 3.68467 17.5675 2.66667 16.0768 2.66667H2.92297C1.43226 2.66667 0.202183 3.68467 0.0224798 5.00021Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        d="M2.92308 5.33333C1.30871 5.33333 0 6.52724 0 8V13.3333C0 14.8061 1.30871 16 2.92308 16H16.0769C17.6913 16 19 14.8061 19 13.3333V8C19 6.52724 17.6913 5.33333 16.0769 5.33333H12.4231C12.0195 5.33333 11.6923 5.63181 11.6923 6C11.6923 7.10457 10.7108 8 9.5 8C8.28922 8 7.30769 7.10457 7.30769 6C7.30769 5.63181 6.98052 5.33333 6.57692 5.33333H2.92308Z"
      />
    </svg>
  );
}

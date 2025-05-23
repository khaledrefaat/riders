import { cn } from "@/lib/utils";

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: string;
  width?: string;
}

export default function HomeIcon({
  className = "",
  height = "23",
  width = "23",
  ...props
}: HomeIconProps) {
  return (
    <svg
      height={height}
      width={width}
      className={cn("text-primary", className)}
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 14.3691C10.7741 14.3691 9.375 15.6571 9.375 17.2459V22.9995H15.625V17.2459C15.625 15.6571 14.2259 14.3691 12.5 14.3691Z"
        fill="currentColor"
      />
      <path
        d="M17.7083 17.2464V23H21.875C23.6009 23 25 21.712 25 20.1232V11.3768C25.0002 10.8786 24.7899 10.3999 24.4135 10.042L15.5615 1.23226C13.9996 -0.32345 11.3634 -0.418969 9.67349 1.01889C9.59321 1.08721 9.51587 1.15837 9.4417 1.23226L0.605225 10.0391C0.217432 10.3985 -0.00014641 10.8846 7.39174e-08 11.3912V20.1232C7.39174e-08 21.712 1.39912 23 3.125 23H7.29165V17.2464C7.31113 14.6316 9.60444 12.4963 12.3733 12.4348C15.2349 12.3712 17.6865 14.5429 17.7083 17.2464Z"
        fill="currentColor"
      />
      <path
        d="M12.5 14.3691C10.7741 14.3691 9.375 15.6571 9.375 17.2459V22.9995H15.625V17.2459C15.625 15.6571 14.2259 14.3691 12.5 14.3691Z"
        fill="currentColor"
      />
    </svg>
  );
}

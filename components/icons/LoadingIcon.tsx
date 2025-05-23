import { cn } from "@/lib/utils";
import React from "react";

interface LoadingIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function LoadingIcon({
  width = 200,
  height = 200,
  className,
}: LoadingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width={width}
      height={height}
      style={{
        shapeRendering: "auto",
        display: "block",
        background: "transparent",
      }}
      className={cn("text-primary", className)}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          stroke="none"
          fill="currentColor"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            values="0 50 51;360 50 51"
            keyTimes="0;1"
          />
        </path>
      </g>
    </svg>
  );
}

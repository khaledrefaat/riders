"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/60 z-50">
      <DotLottieReact src="/vector-3.lottie" loop autoplay />
    </div>
  );
}

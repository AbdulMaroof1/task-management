import type { HTMLAttributes } from "react";

export default function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
      {...props}
    />
  );
}

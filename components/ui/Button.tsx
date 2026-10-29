import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "border border-slate-300 bg-white hover:bg-slate-50",
  dark: "bg-slate-800 text-white hover:bg-slate-900",
  link: "text-indigo-600 hover:bg-indigo-50",
  danger: "text-red-600 hover:bg-red-50",
};

const sizes = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`rounded-lg text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

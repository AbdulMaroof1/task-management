import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldClass} ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={2} className={`${fieldClass} resize-none ${className}`} {...props} />;
}

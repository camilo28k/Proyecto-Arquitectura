import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId = id || props.name;

  return (
    <div>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={[
          "w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
          "placeholder:text-slate-400",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          "disabled:bg-slate-100 disabled:text-slate-500",
          error ? "border-red-300" : "border-slate-300",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
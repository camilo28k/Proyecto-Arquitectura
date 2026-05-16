import { SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
};

export function Select({
  label,
  error,
  id,
  className = "",
  options = [],
  placeholder = "Selecciona una opción",
  children,
  ...props
}: SelectProps) {
  const selectId = id || props.name;

  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={[
          "w-full rounded-xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          "disabled:bg-slate-100 disabled:text-slate-500",
          error ? "border-red-300" : "border-slate-300",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

        {children}
      </select>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
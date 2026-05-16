import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">{title}</h1>

        {description && (
          <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
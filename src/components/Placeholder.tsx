import { ReactNode } from "react";

export default function Placeholder({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section>
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      <div className="placeholder">{children ?? "Skeleton content"}</div>
    </section>
  );
}

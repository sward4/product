import { ReactNode } from "react";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
}

export function Block({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <section className="block">
      {title && <h2>{title}</h2>}
      <div className="placeholder">{children ?? "Skeleton content"}</div>
    </section>
  );
}

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
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Block>{children}</Block>
    </>
  );
}

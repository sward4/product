import { DOMAINS } from "../domains";

export default function DomainFilter({ id }: { id: string }) {
  return (
    <div className="filter">
      <label htmlFor={id}>Domain</label>
      <select id={id} defaultValue="">
        <option value="">All domains</option>
        {DOMAINS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}

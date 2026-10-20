import Placeholder from "../components/Placeholder";
import { DOMAINS } from "../domains";

export default function DomainsPage() {
  return (
    <Placeholder title="Domains" subtitle="Areas of the business, each with its own objectives and PMs.">
      <ul className="plain-list">
        {DOMAINS.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </Placeholder>
  );
}

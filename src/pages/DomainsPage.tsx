import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { DOMAINS } from "../domains";

export default function DomainsPage() {
  return (
    <Placeholder title="Domains" subtitle="Add, merge or remove domains and assign PMs.">
      <ul>
        {DOMAINS.map((d) => (
          <li key={d.id}>
            <Link to={`/d/${d.id}`}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </Placeholder>
  );
}

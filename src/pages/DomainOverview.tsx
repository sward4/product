import Placeholder from "../components/Placeholder";
import { useDomain } from "../components/useDomain";

export default function DomainOverview() {
  const domain = useDomain();
  return (
    <Placeholder title={domain.name} subtitle="Everything in this domain at a glance.">
      Domain scope, PMs, objectives and in-flight initiatives summary goes here.
    </Placeholder>
  );
}

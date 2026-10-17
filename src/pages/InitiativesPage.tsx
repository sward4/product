import Placeholder from "../components/Placeholder";
import { useDomain } from "../components/useDomain";

export default function InitiativesPage() {
  const domain = useDomain();
  return (
    <Placeholder title={`${domain.name} / Initiatives`} subtitle="Prioritised list, each under one objective.">
      Prioritised initiatives go here.
    </Placeholder>
  );
}

import Placeholder from "../components/Placeholder";
import { useDomain } from "../components/useDomain";

export default function ObjectivesPage() {
  const domain = useDomain();
  return (
    <Placeholder title={`${domain.name} / Objectives`} subtitle="About 12 months, fairly stable.">
      Objectives and the business strategies they support go here.
    </Placeholder>
  );
}

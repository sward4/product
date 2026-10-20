import { Block, PageHeader } from "../components/Placeholder";
import DomainFilter from "../components/DomainFilter";

export default function ObjectivesPage() {
  return (
    <>
      <PageHeader title="Objectives" subtitle="About 12 months each, fairly stable. Each supports one or more strategies." />
      <DomainFilter id="objectives-domain" />
      <Block>Objectives and the strategies they support go here.</Block>
    </>
  );
}

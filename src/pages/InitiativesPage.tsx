import { Block, PageHeader } from "../components/Placeholder";
import DomainFilter from "../components/DomainFilter";

export default function InitiativesPage() {
  return (
    <>
      <PageHeader title="Initiatives" subtitle="Prioritised list. Each sits under one objective." />
      <DomainFilter id="initiatives-domain" />
      <Block>Prioritised initiatives go here.</Block>
    </>
  );
}

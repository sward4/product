import Placeholder from "../components/Placeholder";
import { useDomain } from "../components/useDomain";

export default function InboxPage() {
  const domain = useDomain();
  return (
    <Placeholder title={`${domain.name} / Inbox`} subtitle="Quick capture and end-of-day triage.">
      Captured items and triage actions go here.
    </Placeholder>
  );
}

import { useState } from "react";
import { Block, PageHeader } from "../components/Placeholder";

const TYPES = ["All", "Notes", "Follow-ups", "Actions"] as const;

export default function InboxPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");

  return (
    <>
      <PageHeader title="Inbox" subtitle="Capture anything, then triage: discard, attach to an initiative, or keep." />
      <div className="chips" role="tablist" aria-label="Item type">
        {TYPES.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={type === t}
            className={type === t ? "chip active" : "chip"}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <Block>
        {type === "All" ? "Notes, follow-ups and actions" : type} go here, with quick capture at the top.
      </Block>
    </>
  );
}

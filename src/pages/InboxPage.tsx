import { FormEvent, useState } from "react";
import QuickCapture, { KIND_LABELS } from "../components/QuickCapture";
import { useDomain } from "../components/useDomain";
import { InboxItem, InboxKind, useStore } from "../store";

type Filter = "all" | InboxKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "note", label: "Notes" },
  { id: "task", label: "Tasks" },
  { id: "waiting", label: "Waiting on" },
];

const formatTime = (ms: number) =>
  new Date(ms).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

function InboxCard({ item }: { item: InboxItem }) {
  const { updateInboxItem, toggleInboxItem, toggleStarInboxItem, deleteInboxItem } = useStore();
  const [editing, setEditing] = useState(false);
  const [kind, setKind] = useState<InboxKind>(item.kind);
  const [text, setText] = useState(item.text);
  const [who, setWho] = useState(item.who);

  const checkable = item.kind !== "note";
  const canSave = text.trim() !== "" && (kind !== "waiting" || who.trim() !== "");

  const startEditing = () => {
    setKind(item.kind);
    setText(item.text);
    setWho(item.who);
    setEditing(true);
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    // The person only belongs to "waiting on" items, so drop it when converting away.
    updateInboxItem(item.id, {
      kind,
      text: text.trim(),
      who: kind === "waiting" ? who.trim() : "",
    });
    setEditing(false);
  };

  return (
    <li
      className={`inbox-card kind-${item.kind}${item.done ? " is-done" : ""}${item.starred ? " is-starred" : ""}`}
    >
      <div className="inbox-card-top">
        <span className="kind-tag">{KIND_LABELS[item.kind]}</span>
        <span className="inbox-card-meta">
          <time>{formatTime(item.createdAt)}</time>
          <button
            type="button"
            className="star-btn"
            aria-pressed={!!item.starred}
            aria-label={item.starred ? "Unstar" : "Star"}
            title={item.starred ? "Unstar" : "Star to pin to the top"}
            onClick={() => toggleStarInboxItem(item.id)}
          >
            {item.starred ? "★" : "☆"}
          </button>
        </span>
      </div>

      {editing ? (
        <form className="inbox-edit" onSubmit={save}>
          <div className="capture-kinds" role="radiogroup" aria-label="Type">
            {(Object.keys(KIND_LABELS) as InboxKind[]).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={kind === k}
                className={`kind-pill kind-${k}${kind === k ? " selected" : ""}`}
                onClick={() => setKind(k)}
              >
                {KIND_LABELS[k]}
              </button>
            ))}
          </div>
          {kind === "waiting" && (
            <input
              aria-label="Who"
              placeholder="Who?"
              value={who}
              onChange={(e) => setWho(e.target.value)}
            />
          )}
          <textarea
            aria-label="Text"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <div className="inbox-card-actions">
            <button type="submit" className="capture-save" disabled={!canSave}>Save</button>
            <button type="button" className="ghost-btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="inbox-card-main">
            {checkable && (
              <input
                type="checkbox"
                className="inbox-check"
                checked={item.done}
                onChange={() => toggleInboxItem(item.id)}
                aria-label={item.kind === "task" ? "Mark task done" : "Mark received"}
              />
            )}
            <div>
              {item.kind === "waiting" && <div className="inbox-who">{item.who}</div>}
              <p className="inbox-text">{item.text}</p>
            </div>
          </div>
          <div className="inbox-card-actions">
            <button type="button" className="ghost-btn" onClick={startEditing}>Edit</button>
            <button type="button" className="ghost-btn" onClick={() => deleteInboxItem(item.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default function InboxPage() {
  const domain = useDomain();
  const { inbox, addInboxItem } = useStore();
  const [capturing, setCapturing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const items = inbox.filter((i) => i.domainId === domain.id);
  // Starred first; the sort is stable, so each group stays newest-first.
  const shown = (filter === "all" ? items : items.filter((i) => i.kind === filter)).sort(
    (a, b) => Number(!!b.starred) - Number(!!a.starred)
  );
  const open = items.filter((i) => i.kind !== "note" && !i.done).length;

  return (
    <section className="inbox">
      <header className="inbox-header">
        <div>
          <h1>{domain.name} inbox</h1>
          <p className="inbox-sub">
            Scratchpad for notes, tasks and things people are doing for you.
            {open > 0 && ` ${open} open.`}
          </p>
        </div>
        <button type="button" className="capture-fab" onClick={() => setCapturing(true)}>
          <span aria-hidden="true">+</span> Quick capture
        </button>
      </header>

      <div className="inbox-filters" role="tablist" aria-label="Filter inbox">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`filter-tab${filter === f.id ? " selected" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="inbox-empty">
          {items.length === 0
            ? "Nothing captured yet. Hit Quick capture and get it out of your head."
            : "Nothing here."}
        </p>
      ) : (
        <ul className="inbox-grid">
          {shown.map((item) => (
            <InboxCard key={item.id} item={item} />
          ))}
        </ul>
      )}

      {capturing && (
        <QuickCapture
          onClose={() => setCapturing(false)}
          onSave={(item) => addInboxItem({ domainId: domain.id, ...item })}
        />
      )}
    </section>
  );
}

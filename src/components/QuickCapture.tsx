import { FormEvent, KeyboardEvent, useState } from "react";
import { InboxKind } from "../store";

export const KIND_LABELS: Record<InboxKind, string> = {
  note: "Note",
  task: "Task",
  waiting: "Waiting on",
};

const PLACEHOLDERS: Record<InboxKind, string> = {
  note: "Jot something down…",
  task: "What needs doing?",
  waiting: "What are they doing for you?",
};

interface Props {
  onSave: (item: { kind: InboxKind; text: string; who: string }) => void;
  onClose: () => void;
}

export default function QuickCapture({ onSave, onClose }: Props) {
  const [kind, setKind] = useState<InboxKind>("note");
  const [text, setText] = useState("");
  const [who, setWho] = useState("");

  const canSave = text.trim() !== "" && (kind !== "waiting" || who.trim() !== "");

  const save = () => {
    if (!canSave) return;
    onSave({ kind, text: text.trim(), who: kind === "waiting" ? who.trim() : "" });
    onClose();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    save();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) save();
  };

  return (
    <div className="capture-backdrop" onMouseDown={onClose}>
      <form
        className="capture-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Quick capture"
        onSubmit={submit}
        onKeyDown={onKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
      >
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
            aria-label="Who is doing it"
            className="capture-who"
            value={who}
            onChange={(e) => setWho(e.target.value)}
            placeholder="Who?"
            autoFocus
          />
        )}
        <textarea
          aria-label="Capture text"
          className="capture-text"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDERS[kind]}
          autoFocus={kind !== "waiting"}
        />

        <div className="capture-actions">
          <span className="capture-hint">Ctrl + Enter to save</span>
          <button type="button" className="ghost-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="capture-save" disabled={!canSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

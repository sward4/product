import { FormEvent, ReactNode, useState } from "react";

interface Props {
  value: string;
  onSave: (value: string) => void;
  label: string;
  multiline?: boolean;
  // Renders the read-only view; receives the Edit trigger.
  children: (startEditing: () => ReactNode) => ReactNode;
}

export default function EditableText({ value, onSave, label, multiline, children }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const start = () => {
    setDraft(value);
    setEditing(true);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = draft.trim();
    if (!next) return;
    if (next !== value) onSave(next);
    setEditing(false);
  };

  if (!editing) {
    return (
      <>
        {children(() => (
          <button type="button" className="link-btn" onClick={start}>
            Edit
          </button>
        ))}
      </>
    );
  }

  return (
    <form className="edit-form" onSubmit={submit}>
      {multiline ? (
        <textarea
          aria-label={label}
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
      ) : (
        <input
          aria-label={label}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
      )}
      <div className="edit-actions">
        <button type="submit" disabled={!draft.trim()}>Save</button>
        <button type="button" className="link-btn" onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

import { FormEvent, KeyboardEvent, useState } from "react";
import { Initiative } from "../store";

interface Props {
  initialText: string;
  initiatives: Initiative[];
  onCreate: (text: string, initiativeId: string | null) => void;
  onClose: () => void;
}

// Lets the PM tidy the wording and optionally link an initiative before the action exists.
// Cancel, Escape or a click outside leaves everything untouched.
export default function ConvertToAction({ initialText, initiatives, onCreate, onClose }: Props) {
  const [text, setText] = useState(initialText);
  const [initiativeId, setInitiativeId] = useState("");

  const canCreate = text.trim() !== "";

  const create = () => {
    if (!canCreate) return;
    onCreate(text.trim(), initiativeId || null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    create();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) create();
  };

  return (
    <div className="capture-backdrop" onMouseDown={onClose}>
      <form
        className="capture-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Create action from note"
        onSubmit={submit}
        onKeyDown={onKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <label className="convert-label" htmlFor="convert-text">
          Action
        </label>
        <textarea
          id="convert-text"
          className="capture-text"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <label className="convert-label" htmlFor="convert-initiative">
          Link to an initiative (optional)
        </label>
        <select
          id="convert-initiative"
          value={initiativeId}
          onChange={(e) => setInitiativeId(e.target.value)}
        >
          <option value="">Not linked</option>
          {initiatives.map((i) => (
            <option key={i.id} value={i.id}>
              {i.title}
            </option>
          ))}
        </select>
        <div className="capture-actions">
          <span className="capture-hint">The note stays in your inbox</span>
          <button type="button" className="ghost-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="capture-save" disabled={!canCreate}>
            Create action
          </button>
        </div>
      </form>
    </div>
  );
}

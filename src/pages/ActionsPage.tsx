import { DragEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDomain } from "../components/useDomain";
import { Action, Initiative, useStore } from "../store";

interface DropTarget {
  id: string;
  after: boolean;
}

interface RowProps {
  action: Action;
  position: number;
  count: number;
  initiatives: Initiative[];
  dragging: boolean;
  dropMark: "before" | "after" | null;
  onDragStart: (id: string) => void;
  onDragOver: (id: string, e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onDragEnd: () => void;
  onMove: (id: string, by: -1 | 1) => void;
}

function ActionRow(props: RowProps) {
  const { action, position, count, initiatives, dragging, dropMark } = props;
  const { toggleAction, setActionInitiative, deleteAction } = useStore();
  const domain = useDomain();
  const linked = initiatives.find((i) => i.id === action.initiativeId);

  return (
    <li
      className={`action-row${dragging ? " is-dragging" : ""}${dropMark ? ` drop-${dropMark}` : ""}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", action.id);
        props.onDragStart(action.id);
      }}
      onDragOver={(e) => props.onDragOver(action.id, e)}
      onDrop={props.onDrop}
      onDragEnd={props.onDragEnd}
    >
      <span className="action-handle" aria-hidden="true" title="Drag to reprioritise">⠿</span>
      <span className="action-rank" aria-label={`Priority ${position}`}>{position}</span>
      <input
        type="checkbox"
        className="action-check"
        checked={false}
        onChange={() => toggleAction(action.id)}
        aria-label={`Mark done: ${action.text}`}
      />
      <div className="action-body">
        <p className="action-text">{action.text}</p>
        <div className="action-meta">
          {linked ? (
            <Link className="tag tag-initiative" to={`/d/${domain.id}/initiatives/${linked.id}`}>
              {linked.title}
            </Link>
          ) : (
            <span className="action-unlinked">Not linked</span>
          )}
          <select
            aria-label="Linked initiative"
            value={action.initiativeId ?? ""}
            onChange={(e) => setActionInitiative(action.id, e.target.value || null)}
          >
            <option value="">Not linked</option>
            {initiatives.map((i) => (
              <option key={i.id} value={i.id}>{i.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="action-controls">
        <button
          type="button"
          className="icon-btn"
          aria-label="Move up"
          disabled={position === 1}
          onClick={() => props.onMove(action.id, -1)}
        >
          ▲
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Move down"
          disabled={position === count}
          onClick={() => props.onMove(action.id, 1)}
        >
          ▼
        </button>
        <button type="button" className="link-btn" onClick={() => deleteAction(action.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default function ActionsPage() {
  const domain = useDomain();
  const { actions, initiatives, addAction, toggleAction, reorderActions } = useStore();
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const [initiativeId, setInitiativeId] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [target, setTarget] = useState<DropTarget | null>(null);

  const mine = actions.filter((a) => a.domainId === domain.id);
  const open = mine.filter((a) => !a.done);
  const done = mine.filter((a) => a.done);
  const domainInitiatives = initiatives.filter((i) => i.domainId === domain.id);

  // Done actions keep their place after the open ones, so un-ticking restores them.
  const commit = (openIds: string[]) =>
    reorderActions(domain.id, [...openIds, ...done.map((a) => a.id)]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addAction(domain.id, text.trim(), initiativeId || null);
    setText("");
    setInitiativeId("");
    setAdding(false);
  };

  const clearDrag = () => {
    setDragId(null);
    setTarget(null);
  };

  const onDragOver = (id: string, e: DragEvent) => {
    if (!dragId) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setTarget({ id, after: e.clientY > rect.top + rect.height / 2 });
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    if (dragId && target && dragId !== target.id) {
      const rest = open.map((a) => a.id).filter((id) => id !== dragId);
      const at = rest.indexOf(target.id) + (target.after ? 1 : 0);
      rest.splice(at, 0, dragId);
      commit(rest);
    }
    clearDrag();
  };

  const move = (id: string, by: -1 | 1) => {
    const ids = open.map((a) => a.id);
    const from = ids.indexOf(id);
    const to = from + by;
    if (to < 0 || to >= ids.length) return;
    ids.splice(to, 0, ...ids.splice(from, 1));
    commit(ids);
  };

  return (
    <section className="actions-page">
      <header className="actions-header">
        <div>
          <h1>{domain.name} actions</h1>
          <p className="subtitle">
            Your prioritised to-do list. Drag to reorder, with the most important at the top.
            {open.length > 0 && ` ${open.length} open.`}
          </p>
        </div>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)}>
            + Add action
          </button>
        )}
      </header>

      {adding && (
        <form className="card action-form" onSubmit={submit}>
          <label htmlFor="action-text">What needs doing?</label>
          <input
            id="action-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Send the carrier scorecard draft to Sam"
            autoFocus
          />
          <label htmlFor="action-initiative">Link to an initiative (optional)</label>
          <select
            id="action-initiative"
            value={initiativeId}
            onChange={(e) => setInitiativeId(e.target.value)}
          >
            <option value="">Not linked</option>
            {domainInitiatives.map((i) => (
              <option key={i.id} value={i.id}>{i.title}</option>
            ))}
          </select>
          <div className="edit-actions">
            <button type="submit" disabled={!text.trim()}>Add action</button>
            <button type="button" className="link-btn" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
          <p className="action-hint">New actions go to the bottom. Drag them up to prioritise.</p>
        </form>
      )}

      {open.length === 0 ? (
        <p className="placeholder">
          {mine.length === 0
            ? "No actions yet. Add one to start your list."
            : "All done. Nothing open."}
        </p>
      ) : (
        <ol className="action-list" aria-label="Open actions, highest priority first">
          {open.map((a, i) => (
            <ActionRow
              key={a.id}
              action={a}
              position={i + 1}
              count={open.length}
              initiatives={domainInitiatives}
              dragging={dragId === a.id}
              dropMark={
                target?.id === a.id && dragId !== a.id ? (target.after ? "after" : "before") : null
              }
              onDragStart={setDragId}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={clearDrag}
              onMove={move}
            />
          ))}
        </ol>
      )}

      {done.length > 0 && (
        <>
          <h2 className="section-title">Done</h2>
          <ul className="action-list done-list">
            {done.map((a) => (
              <li key={a.id} className="action-row is-done">
                <input
                  type="checkbox"
                  className="action-check"
                  checked
                  onChange={() => toggleAction(a.id)}
                  aria-label={`Mark not done: ${a.text}`}
                />
                <p className="action-text">{a.text}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

import { FormEvent, useState } from "react";
import { useStore } from "../store";

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-AU", { day: "numeric", month: "short" });

export default function BuildNotesPage() {
  const { buildNotes, addBuildNote, toggleBuildNote, deleteBuildNote } = useStore();
  const [text, setText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addBuildNote(text.trim());
    setText("");
  };

  const open = buildNotes.filter((n) => !n.done);
  const done = buildNotes.filter((n) => n.done);

  return (
    <section>
      <h1>Build notes</h1>
      <p className="subtitle">
        Ideas to think about adding to this build. Just for you, not part of any roadmap.
      </p>

      <form className="form" onSubmit={submit}>
        <label htmlFor="build-note-text">New idea</label>
        <textarea
          id="build-note-text"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Weekly update builder that drafts the exec email"
        />
        <button type="submit" disabled={!text.trim()}>Add note</button>
      </form>

      {buildNotes.length === 0 ? (
        <p className="placeholder">No ideas yet. Jot the first one above.</p>
      ) : (
        <>
          <ul className="list">
            {open.map((n) => (
              <li key={n.id} className="card build-note">
                <input
                  type="checkbox"
                  className="action-check"
                  checked={false}
                  onChange={() => toggleBuildNote(n.id)}
                  aria-label={`Mark considered: ${n.text}`}
                />
                <div className="build-note-body">
                  <p className="card-text">{n.text}</p>
                  <div className="card-meta">
                    <span>{formatDate(n.createdAt)}</span>
                    <button type="button" className="link-btn" onClick={() => deleteBuildNote(n.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {done.length > 0 && (
            <>
              <h2 className="section-title">Considered</h2>
              <ul className="list">
                {done.map((n) => (
                  <li key={n.id} className="card build-note is-done">
                    <input
                      type="checkbox"
                      className="action-check"
                      checked
                      onChange={() => toggleBuildNote(n.id)}
                      aria-label={`Mark not considered: ${n.text}`}
                    />
                    <div className="build-note-body">
                      <p className="card-text">{n.text}</p>
                      <div className="card-meta">
                        <span>{formatDate(n.createdAt)}</span>
                        <button type="button" className="link-btn" onClick={() => deleteBuildNote(n.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </section>
  );
}

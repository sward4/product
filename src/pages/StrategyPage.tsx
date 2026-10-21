import { FormEvent, useState } from "react";
import EditableText from "../components/EditableText";
import { useStore } from "../store";

export default function StrategyPage() {
  const { strategies, objectives, addStrategy, updateStrategy, deleteStrategy } = useStore();
  const [text, setText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    addStrategy(value);
    setText("");
  };

  return (
    <section>
      <h1>Strategy</h1>
      <p className="subtitle">Business strategies set by leadership.</p>

      <form className="card form" onSubmit={submit}>
        <label htmlFor="strategy-text">New strategy</label>
        <textarea
          id="strategy-text"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe the strategy"
        />
        <button type="submit" disabled={!text.trim()}>Add strategy</button>
      </form>

      {strategies.length === 0 ? (
        <div className="placeholder">No strategies yet.</div>
      ) : (
        <ul className="list">
          {strategies.map((s) => {
            const linked = objectives.filter((o) => o.strategyIds.includes(s.id)).length;
            return (
              <li key={s.id} className="card">
                <EditableText
                  value={s.text}
                  label="Strategy text"
                  multiline
                  onSave={(text) => updateStrategy(s.id, text)}
                >
                  {(editButton) => (
                    <>
                      <p className="card-text">{s.text}</p>
                      <div className="card-meta">
                        <span className="tag tag-objective">
                          {linked} linked {linked === 1 ? "objective" : "objectives"}
                        </span>
                        <span className="card-actions">
                          {editButton()}
                          <button type="button" className="link-btn" onClick={() => deleteStrategy(s.id)}>
                            Delete
                          </button>
                        </span>
                      </div>
                    </>
                  )}
                </EditableText>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

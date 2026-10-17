import { FormEvent, useState } from "react";
import EditableText from "../components/EditableText";
import { useDomain } from "../components/useDomain";
import { useStore } from "../store";

export default function ObjectivesPage() {
  const domain = useDomain();
  const {
    strategies,
    objectives,
    initiatives,
    addObjective,
    updateObjective,
    deleteObjective,
    linkStrategy,
    unlinkStrategy,
  } = useStore();
  const [title, setTitle] = useState("");

  const domainObjectives = objectives.filter((o) => o.domainId === domain.id);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    addObjective(domain.id, value);
    setTitle("");
  };

  return (
    <section>
      <h1>{domain.name} / Objectives</h1>
      <p className="subtitle">About 12 months, fairly stable.</p>

      <form className="card form" onSubmit={submit}>
        <label htmlFor="objective-title">New objective</label>
        <input
          id="objective-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What should this domain achieve?"
        />
        <button type="submit" disabled={!title.trim()}>Add objective</button>
      </form>

      {domainObjectives.length === 0 ? (
        <div className="placeholder">No objectives for {domain.name} yet.</div>
      ) : (
        <ul className="list">
          {domainObjectives.map((o) => {
            const linked = o.strategyIds
              .map((id) => strategies.find((s) => s.id === id))
              .filter((s) => s !== undefined);
            const available = strategies.filter((s) => !o.strategyIds.includes(s.id));
            return (
              <li key={o.id} className="card objective-card">
                <div className="card-head-wrap">
                  <EditableText
                    value={o.title}
                    label="Objective title"
                    onSave={(t) => updateObjective(o.id, t)}
                  >
                    {(editButton) => (
                      <div className="card-head">
                        <h2>{o.title}</h2>
                        <span className="card-actions">
                          {editButton()}
                          <button type="button" className="link-btn" onClick={() => deleteObjective(o.id)}>
                            Delete
                          </button>
                        </span>
                      </div>
                    )}
                  </EditableText>
                </div>

                {linked.length > 0 && (
                  <ul className="chips">
                    {linked.map((s) => (
                      <li key={s.id} className="chip">
                        <span>{s.text}</span>
                        <button
                          type="button"
                          aria-label="Unlink strategy"
                          onClick={() => unlinkStrategy(o.id, s.id)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {initiatives.some((i) => i.objectiveId === o.id) && (
                  <p className="card-meta">
                    Initiatives: {initiatives.filter((i) => i.objectiveId === o.id).map((i) => i.title).join(", ")}
                  </p>
                )}

                <select
                  aria-label={`Link a strategy to ${o.title}`}
                  value=""
                  disabled={available.length === 0}
                  onChange={(e) => e.target.value && linkStrategy(o.id, e.target.value)}
                >
                  <option value="">
                    {strategies.length === 0
                      ? "No strategies yet. Create one on the Strategy page."
                      : available.length === 0
                        ? "All strategies linked"
                        : "Link a strategy…"}
                  </option>
                  {available.map((s) => (
                    <option key={s.id} value={s.id}>{s.text}</option>
                  ))}
                </select>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

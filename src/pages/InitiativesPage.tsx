import { FormEvent, useState } from "react";
import EditableText from "../components/EditableText";
import { useDomain } from "../components/useDomain";
import { useStore } from "../store";

export default function InitiativesPage() {
  const domain = useDomain();
  const {
    objectives,
    initiatives,
    addInitiative,
    updateInitiative,
    setInitiativeObjective,
    deleteInitiative,
  } = useStore();
  const [title, setTitle] = useState("");
  const [objectiveId, setObjectiveId] = useState("");

  const domainObjectives = objectives.filter((o) => o.domainId === domain.id);
  const domainInitiatives = initiatives.filter((i) => i.domainId === domain.id);
  // The selection may point at an objective that was deleted or belongs to another domain.
  const selected = domainObjectives.some((o) => o.id === objectiveId) ? objectiveId : "";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    addInitiative(domain.id, value, selected || null);
    setTitle("");
  };

  return (
    <section>
      <h1>{domain.name} / Initiatives</h1>
      <p className="subtitle">Prioritised list, each under one objective.</p>

      <form className="card form" onSubmit={submit}>
        <label htmlFor="initiative-title">New initiative</label>
        <input
          id="initiative-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What will the team deliver?"
        />
        <label htmlFor="initiative-objective">Objective</label>
        <select
          id="initiative-objective"
          value={selected}
          onChange={(e) => setObjectiveId(e.target.value)}
        >
          <option value="">
            {domainObjectives.length === 0 ? "No objectives yet" : "No objective"}
          </option>
          {domainObjectives.map((o) => (
            <option key={o.id} value={o.id}>{o.title}</option>
          ))}
        </select>
        <button type="submit" disabled={!title.trim()}>Add initiative</button>
      </form>

      {domainInitiatives.length === 0 ? (
        <div className="placeholder">No initiatives for {domain.name} yet.</div>
      ) : (
        <ul className="list">
          {domainInitiatives.map((i) => (
            <li key={i.id} className="card">
              <EditableText
                value={i.title}
                label="Initiative title"
                onSave={(t) => updateInitiative(i.id, t)}
              >
                {(editButton) => (
                  <div className="card-head">
                    <h2>{i.title}</h2>
                    <span className="card-actions">
                      {editButton()}
                      <button type="button" className="link-btn" onClick={() => deleteInitiative(i.id)}>
                        Delete
                      </button>
                    </span>
                  </div>
                )}
              </EditableText>
              <select
                aria-label={`Objective for ${i.title}`}
                className={`objective-select${domainObjectives.some((o) => o.id === i.objectiveId) ? "" : " unplaced"}`}
                value={domainObjectives.some((o) => o.id === i.objectiveId) ? i.objectiveId! : ""}
                onChange={(e) => setInitiativeObjective(i.id, e.target.value || null)}
              >
                <option value="">No objective</option>
                {domainObjectives.map((o) => (
                  <option key={o.id} value={o.id}>{o.title}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

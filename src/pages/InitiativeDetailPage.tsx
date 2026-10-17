import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import EditableText from "../components/EditableText";
import { findDomain } from "../domains";
import { INITIATIVE_STATUSES, InitiativeStatus, Strategy, useStore } from "../store";

export default function InitiativeDetailPage() {
  const { domainId, initiativeId } = useParams();
  const navigate = useNavigate();
  const {
    initiatives,
    objectives,
    strategies,
    updateInitiative,
    patchInitiative,
    setInitiativeObjective,
    deleteInitiative,
  } = useStore();

  const initiative = initiatives.find((i) => i.id === initiativeId);

  if (!initiative) {
    return (
      <section>
        <h1>Initiative not found</h1>
        <p className="subtitle">It may have been deleted.</p>
        <Link to={`/d/${domainId}/initiatives`}>Back to initiatives</Link>
      </section>
    );
  }

  // Keep the URL's domain in step with the initiative's real domain.
  if (initiative.domainId !== domainId) {
    return <Navigate to={`/d/${initiative.domainId}/initiatives/${initiative.id}`} replace />;
  }

  const domain = findDomain(initiative.domainId);
  const listPath = `/d/${initiative.domainId}/initiatives`;
  const domainObjectives = objectives.filter((o) => o.domainId === initiative.domainId);
  const objective = domainObjectives.find((o) => o.id === initiative.objectiveId);
  const linkedStrategies = (objective?.strategyIds ?? [])
    .map((id) => strategies.find((s) => s.id === id))
    .filter((s): s is Strategy => s !== undefined);

  return (
    <section className="detail">
      <Link to={listPath} className="back-link">
        ← {domain?.name} initiatives
      </Link>

      <EditableText
        value={initiative.title}
        label="Initiative title"
        onSave={(t) => updateInitiative(initiative.id, t)}
      >
        {(editButton) => (
          <div className="card-head detail-title">
            <h1>{initiative.title}</h1>
            <span className="card-actions">
              {editButton()}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  deleteInitiative(initiative.id);
                  navigate(listPath);
                }}
              >
                Delete
              </button>
            </span>
          </div>
        )}
      </EditableText>

      <div className="detail-grid">
        <div className="card form">
          <div className="field">
            <label htmlFor="initiative-status">Status</label>
            <select
              id="initiative-status"
              value={initiative.status ?? "backlog"}
              onChange={(e) =>
                patchInitiative(initiative.id, { status: e.target.value as InitiativeStatus })
              }
            >
              {INITIATIVE_STATUSES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="initiative-owner">Owner</label>
            <input
              id="initiative-owner"
              value={initiative.owner ?? ""}
              onChange={(e) => patchInitiative(initiative.id, { owner: e.target.value })}
              placeholder="Who is accountable for this?"
            />
          </div>

          <div className="field">
            <label htmlFor="initiative-objective">Objective</label>
            <select
              id="initiative-objective"
              value={objective ? objective.id : ""}
              onChange={(e) => setInitiativeObjective(initiative.id, e.target.value || null)}
            >
              <option value="">No objective</option>
              {domainObjectives.map((o) => (
                <option key={o.id} value={o.id}>{o.title}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="initiative-description">Description</label>
            <textarea
              id="initiative-description"
              rows={6}
              value={initiative.description ?? ""}
              onChange={(e) => patchInitiative(initiative.id, { description: e.target.value })}
              placeholder="What is this, and why does it matter?"
            />
          </div>

          <div className="field">
            <label htmlFor="initiative-success">Success measure</label>
            <textarea
              id="initiative-success"
              rows={3}
              value={initiative.successMeasure ?? ""}
              onChange={(e) => patchInitiative(initiative.id, { successMeasure: e.target.value })}
              placeholder="How will we know it worked?"
            />
          </div>
        </div>

        <div className="card trace">
          <h2>Where this fits</h2>
          <p className="trace-label">Objective</p>
          {objective ? (
            <span className="tag tag-objective">{objective.title}</span>
          ) : (
            <span className="tag tag-unplaced">No objective yet</span>
          )}

          <p className="trace-label">Strategies it supports</p>
          {linkedStrategies.length > 0 ? (
            <ul className="chips">
              {linkedStrategies.map((s) => (
                <li key={s.id} className="chip static">{s.text}</li>
              ))}
            </ul>
          ) : (
            <p className="trace-empty">
              {objective
                ? "This objective has no linked strategies yet."
                : "Place it under an objective to see its strategies."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

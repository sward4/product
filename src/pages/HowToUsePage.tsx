import { Link } from "react-router-dom";
import { useActiveDomain } from "../components/useDomain";
import { SAMPLE_INITIATIVES } from "../sampleData";
import { useStore } from "../store";

interface Step {
  title: string;
  body: string;
  to: string;
  cta: string;
  status: string;
  done: boolean;
}

export default function HowToUsePage() {
  const domain = useActiveDomain();
  const { strategies, objectives, initiatives, addSampleData } = useStore();
  const sampleLoaded = SAMPLE_INITIATIVES.every((s) => initiatives.some((i) => i.id === s.id));

  const linkedObjectives = objectives.filter((o) => o.strategyIds.length > 0);
  const placedInitiatives = initiatives.filter((i) => i.objectiveId !== null);

  const count = (n: number, singular: string, plural = `${singular}s`) =>
    `${n} ${n === 1 ? singular : plural}`;

  const steps: Step[] = [
    {
      title: "Set the business strategies",
      body: "Start with the strategies leadership has set. Add each one as a short description. They are shared across every domain, so you only write them once.",
      to: "/strategy",
      cta: "Go to Strategy",
      status: count(strategies.length, "strategy", "strategies"),
      done: strategies.length > 0,
    },
    {
      title: "Set objectives and link strategies",
      body: "In each domain, add the objectives it is aiming for over the next 12 months. Then link each objective to the strategies it supports, so every objective can be traced back to the business direction.",
      to: `/d/${domain.id}/objectives`,
      cta: `Go to ${domain.name} objectives`,
      status: `${count(objectives.length, "objective")} across all domains, ${linkedObjectives.length} linked to a strategy`,
      done: objectives.length > 0 && linkedObjectives.length === objectives.length,
    },
    {
      title: "Build the initiatives backlog",
      body: "Add the initiatives each team could deliver. Each one sits under exactly one objective, which you can change at any time. Detailing each initiative comes later.",
      to: `/d/${domain.id}/initiatives`,
      cta: `Go to ${domain.name} initiatives`,
      status: `${count(initiatives.length, "initiative")} across all domains, ${placedInitiatives.length} under an objective`,
      done: initiatives.length > 0 && placedInitiatives.length === initiatives.length,
    },
  ];

  return (
    <section>
      <h1>How to use</h1>
      <p className="subtitle">
        Work through these steps in order. Each step builds on the one before, and they are the same
        for every domain.
      </p>

      <ol className="steps">
        {steps.map((step, index) => (
          <li key={step.title} className={`card step${step.done ? " done" : ""}`}>
            <span className="step-number" aria-hidden="true">{step.done ? "✓" : index + 1}</span>
            <div className="step-body">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="step-footer">
                <Link to={step.to}>{step.cta}</Link>
                <span className="card-meta">{step.status}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="card prototype-note">
        <h3>Prototype content</h3>
        <p>
          Add 15 placeholder initiatives (with 3 objectives for them to sit under) to the Fulfilment
          domain, so there is something to look at. Loading it twice does nothing.
        </p>
        <button type="button" onClick={addSampleData} disabled={sampleLoaded}>
          {sampleLoaded ? "Sample data loaded" : "Load sample data"}
        </button>
      </div>
    </section>
  );
}

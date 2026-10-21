import { ReactNode } from "react";

// Placeholders only: they keep the "one app for everything" idea visible.
// The icons are generic shapes rather than vendor logos.
const stroke = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const INTEGRATIONS: { label: string; icon: ReactNode }[] = [
  {
    label: "Jira",
    icon: (
      <svg {...stroke}>
        <rect x="3" y="4" width="5" height="16" rx="1.5" />
        <rect x="10" y="4" width="5" height="10" rx="1.5" />
        <rect x="17" y="4" width="4" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Confluence",
    icon: (
      <svg {...stroke}>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg {...stroke}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </svg>
    ),
  },
  {
    label: "Slack",
    icon: (
      <svg {...stroke}>
        <path d="M9 4 7 20M17 4l-2 16M4 9h16M3.5 15h16" />
      </svg>
    ),
  },
  {
    label: "Teams",
    icon: (
      <svg {...stroke}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M17.5 14a4 4 0 0 1 3.5 4v1" />
      </svg>
    ),
  },
];

export default function IntegrationsNav() {
  return (
    <section className="integrations" aria-labelledby="integrations-heading">
      <h2 id="integrations-heading" className="integrations-heading">
        Integrations
      </h2>
      <ul>
        {INTEGRATIONS.map((i) => (
          <li key={i.label} className="integration" aria-disabled="true">
            {i.icon}
            <span className="integration-label">{i.label}</span>
            <span className="integration-badge">Soon</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

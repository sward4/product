import type { Initiative, Objective } from "./store";

// Placeholder content for the prototype. Fixed ids make loading idempotent.
const DOMAIN = "fulfilment";

export const SAMPLE_OBJECTIVES: Objective[] = [
  { id: "sample-o1", domainId: DOMAIN, title: "Deliver faster and more reliably", strategyIds: [] },
  { id: "sample-o2", domainId: DOMAIN, title: "Lower the cost to serve", strategyIds: [] },
  { id: "sample-o3", domainId: DOMAIN, title: "Give customers live visibility of their order", strategyIds: [] },
];

const init = (n: number, objectiveId: string | null, title: string): Initiative => ({
  id: `sample-i${n}`,
  domainId: DOMAIN,
  title,
  objectiveId,
});

export const SAMPLE_INITIATIVES: Initiative[] = [
  init(1, "sample-o1", "Extend same-day dispatch cut-off to 3pm"),
  init(2, "sample-o1", "Carrier performance scorecards"),
  init(3, "sample-o1", "Click-and-collect ready in one hour"),
  init(4, "sample-o1", "Peak season capacity plan"),
  init(5, "sample-o1", "Reduce split shipments"),
  init(6, "sample-o2", "Route orders between stores and DCs by cost"),
  init(7, "sample-o2", "Right-size packaging"),
  init(8, "sample-o2", "Consolidate returns at regional hubs"),
  init(9, "sample-o2", "Renegotiate carrier rates"),
  init(10, "sample-o3", "Proactive delay notifications"),
  init(11, "sample-o3", "Self-serve delivery rescheduling"),
  init(12, "sample-o3", "Single order tracking page"),
  // Left without an objective so the backlog shows unplaced work.
  init(13, null, "Warehouse robotics feasibility study"),
  init(14, null, "Address validation at checkout"),
  init(15, null, "Parcel locker pilot"),
];

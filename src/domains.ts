export interface Domain {
  id: string;
  name: string;
}

// Placeholder data until domains come from the backend.
export const DOMAINS: Domain[] = [
  { id: "shop", name: "Shop" },
  { id: "post-shop", name: "Post Shop" },
  { id: "fulfilment", name: "Fulfilment" },
  { id: "loyalty", name: "Loyalty" },
  { id: "marketplace", name: "Marketplace" },
];

export const DEFAULT_DOMAIN_ID = "fulfilment";

export const findDomain = (id: string | undefined) =>
  DOMAINS.find((d) => d.id === id);

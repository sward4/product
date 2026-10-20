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

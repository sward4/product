import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { DEFAULT_DOMAIN_ID, findDomain } from "../domains";

export function useDomain() {
  const { domainId } = useParams();
  return findDomain(domainId) ?? findDomain(DEFAULT_DOMAIN_ID)!;
}

const LAST_DOMAIN_KEY = "pm-roadmap:last-domain";

const readLastDomain = () => {
  try {
    return localStorage.getItem(LAST_DOMAIN_KEY) ?? undefined;
  } catch {
    return undefined;
  }
};

// The domain from the URL when on a /d/:id route; otherwise the last one visited, so
// global pages (Strategy, Domains, How to use) don't reset the sidebar to the default.
export function useActiveDomain() {
  const match = useMatch("/d/:domainId/*");
  const fromUrl = findDomain(match?.params.domainId);

  useEffect(() => {
    if (!fromUrl) return;
    try {
      localStorage.setItem(LAST_DOMAIN_KEY, fromUrl.id);
    } catch {
      // storage unavailable; the fallback below still works
    }
  }, [fromUrl]);

  return fromUrl ?? findDomain(readLastDomain()) ?? findDomain(DEFAULT_DOMAIN_ID)!;
}

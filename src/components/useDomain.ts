import { useParams } from "react-router-dom";
import { DEFAULT_DOMAIN_ID, findDomain } from "../domains";

export function useDomain() {
  const { domainId } = useParams();
  return findDomain(domainId) ?? findDomain(DEFAULT_DOMAIN_ID)!;
}

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SAMPLE_INITIATIVES, SAMPLE_OBJECTIVES } from "./sampleData";

export interface Strategy {
  id: string;
  text: string;
}

export interface Objective {
  id: string;
  domainId: string;
  title: string;
  strategyIds: string[];
}

export interface Initiative {
  id: string;
  domainId: string;
  title: string;
  // Each initiative sits under one objective; null once that objective is deleted.
  objectiveId: string | null;
}

// note: free text. task: something to do. waiting: something a person is doing for you.
export type InboxKind = "note" | "task" | "waiting";

export interface InboxItem {
  id: string;
  domainId: string;
  kind: InboxKind;
  text: string;
  who: string; // only meaningful for "waiting"
  done: boolean;
  starred?: boolean; // absent on items saved before starring existed
  createdAt: number;
}

interface Data {
  strategies: Strategy[];
  objectives: Objective[];
  initiatives: Initiative[];
  inbox: InboxItem[];
}

interface Store extends Data {
  addStrategy: (text: string) => void;
  updateStrategy: (id: string, text: string) => void;
  deleteStrategy: (id: string) => void;
  updateObjective: (id: string, title: string) => void;
  addObjective: (domainId: string, title: string) => void;
  deleteObjective: (id: string) => void;
  linkStrategy: (objectiveId: string, strategyId: string) => void;
  unlinkStrategy: (objectiveId: string, strategyId: string) => void;
  addInitiative: (domainId: string, title: string, objectiveId: string | null) => void;
  updateInitiative: (id: string, title: string) => void;
  setInitiativeObjective: (id: string, objectiveId: string | null) => void;
  deleteInitiative: (id: string) => void;
  addInboxItem: (item: { domainId: string; kind: InboxKind; text: string; who: string }) => void;
  updateInboxItem: (
    id: string,
    patch: Partial<Pick<InboxItem, "kind" | "text" | "who">>
  ) => void;
  addSampleData: () => void;
  toggleInboxItem: (id: string) => void;
  toggleStarInboxItem: (id: string) => void;
  deleteInboxItem: (id: string) => void;
}

// Placeholder persistence until data comes from the backend.
const KEY = "pm-roadmap:v1";
const EMPTY: Data = { strategies: [], objectives: [], initiatives: [], inbox: [] };

const load = (): Data => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
};

const uid = () => crypto.randomUUID();

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // storage unavailable; keep in-memory state
    }
  }, [data]);

  const store: Store = {
    ...data,
    addStrategy: (text) =>
      setData((d) => ({ ...d, strategies: [...d.strategies, { id: uid(), text }] })),
    updateStrategy: (id, text) =>
      setData((d) => ({
        ...d,
        strategies: d.strategies.map((s) => (s.id === id ? { ...s, text } : s)),
      })),
    updateObjective: (id, title) =>
      setData((d) => ({
        ...d,
        objectives: d.objectives.map((o) => (o.id === id ? { ...o, title } : o)),
      })),
    deleteStrategy: (id) =>
      setData((d) => ({
        ...d,
        strategies: d.strategies.filter((s) => s.id !== id),
        objectives: d.objectives.map((o) => ({
          ...o,
          strategyIds: o.strategyIds.filter((sid) => sid !== id),
        })),
      })),
    addObjective: (domainId, title) =>
      setData((d) => ({
        ...d,
        objectives: [...d.objectives, { id: uid(), domainId, title, strategyIds: [] }],
      })),
    deleteObjective: (id) =>
      setData((d) => ({
        ...d,
        objectives: d.objectives.filter((o) => o.id !== id),
        initiatives: d.initiatives.map((i) =>
          i.objectiveId === id ? { ...i, objectiveId: null } : i
        ),
      })),
    linkStrategy: (objectiveId, strategyId) =>
      setData((d) => ({
        ...d,
        objectives: d.objectives.map((o) =>
          o.id === objectiveId && !o.strategyIds.includes(strategyId)
            ? { ...o, strategyIds: [...o.strategyIds, strategyId] }
            : o
        ),
      })),
    unlinkStrategy: (objectiveId, strategyId) =>
      setData((d) => ({
        ...d,
        objectives: d.objectives.map((o) =>
          o.id === objectiveId
            ? { ...o, strategyIds: o.strategyIds.filter((s) => s !== strategyId) }
            : o
        ),
      })),
    addInitiative: (domainId, title, objectiveId) =>
      setData((d) => ({
        ...d,
        initiatives: [...d.initiatives, { id: uid(), domainId, title, objectiveId }],
      })),
    updateInitiative: (id, title) =>
      setData((d) => ({
        ...d,
        initiatives: d.initiatives.map((i) => (i.id === id ? { ...i, title } : i)),
      })),
    setInitiativeObjective: (id, objectiveId) =>
      setData((d) => ({
        ...d,
        initiatives: d.initiatives.map((i) => (i.id === id ? { ...i, objectiveId } : i)),
      })),
    deleteInitiative: (id) =>
      setData((d) => ({ ...d, initiatives: d.initiatives.filter((i) => i.id !== id) })),
    addInboxItem: (item) =>
      setData((d) => ({
        ...d,
        inbox: [{ id: uid(), done: false, createdAt: Date.now(), ...item }, ...d.inbox],
      })),
    updateInboxItem: (id, patch) =>
      setData((d) => ({
        ...d,
        inbox: d.inbox.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      })),
    toggleInboxItem: (id) =>
      setData((d) => ({
        ...d,
        inbox: d.inbox.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
      })),
    addSampleData: () =>
      setData((d) => ({
        ...d,
        objectives: [
          ...d.objectives,
          ...SAMPLE_OBJECTIVES.filter((s) => !d.objectives.some((o) => o.id === s.id)),
        ],
        initiatives: [
          ...d.initiatives,
          ...SAMPLE_INITIATIVES.filter((s) => !d.initiatives.some((i) => i.id === s.id)),
        ],
      })),
    toggleStarInboxItem: (id) =>
      setData((d) => ({
        ...d,
        inbox: d.inbox.map((i) => (i.id === id ? { ...i, starred: !i.starred } : i)),
      })),
    deleteInboxItem: (id) =>
      setData((d) => ({ ...d, inbox: d.inbox.filter((i) => i.id !== id) })),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

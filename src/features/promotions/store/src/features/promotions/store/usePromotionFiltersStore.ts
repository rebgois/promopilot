
import { create } from "zustand";

export type PromotionStatusFilter =
  | "all"
  | "healthy"
  | "warning"
  | "loss";

interface PromotionFiltersState {
  search: string;
  statusFilter: PromotionStatusFilter;

  setSearch: (search: string) => void;
  setStatusFilter: (status: PromotionStatusFilter) => void;
  clearFilters: () => void;
}

export const usePromotionFiltersStore =
  create<PromotionFiltersState>((set) => ({
    search: "",
    statusFilter: "all",

    setSearch: (search) => set({ search }),

    setStatusFilter: (statusFilter) =>
      set({ statusFilter }),

    clearFilters: () =>
      set({
        search: "",
        statusFilter: "all",
      }),
  }));

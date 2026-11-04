
import { beforeEach, describe, expect, it } from "vitest";

import { usePromotionFiltersStore } from "./usePromotionFiltersStore";

describe("usePromotionFiltersStore", () => {
  beforeEach(() => {
    usePromotionFiltersStore.getState().clearFilters();
  });

  it("deve iniciar com os filtros padrão", () => {
    const state = usePromotionFiltersStore.getState();

    expect(state.search).toBe("");
    expect(state.statusFilter).toBe("all");
  });

  it("deve atualizar a pesquisa", () => {
    usePromotionFiltersStore
      .getState()
      .setSearch("Café");

    expect(
      usePromotionFiltersStore.getState().search,
    ).toBe("Café");
  });

  it("deve atualizar o filtro de classificação", () => {
    usePromotionFiltersStore
      .getState()
      .setStatusFilter("loss");

    expect(
      usePromotionFiltersStore.getState().statusFilter,
    ).toBe("loss");
  });

  it("deve limpar todos os filtros", () => {
    const store = usePromotionFiltersStore.getState();

    store.setSearch("Café");
    store.setStatusFilter("loss");
    store.clearFilters();

    const state = usePromotionFiltersStore.getState();

    expect(state.search).toBe("");
    expect(state.statusFilter).toBe("all");
  });
});

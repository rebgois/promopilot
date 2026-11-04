
import { describe, expect, it } from "vitest";

import products from "../../promotions/data/products.json";
import { analyzePromotions } from "../../promotions/domain/analyzePromotions";

import { generateAssistantResponse } from "./generateAssistantResponse";

const analysis = analyzePromotions(products);
const emptyAnalysis = analyzePromotions([]);

describe("Geração de respostas comerciais", () => {
  it("apresenta produtos em prejuízo", () => {
    const response = generateAssistantResponse(
      { type: "list_by_status", status: "loss" },
      analysis,
    );

    expect(response.message).toContain("Café 500 g");
    expect(response.message).toContain("-7,14%");
    expect(response.action).toBeUndefined();
  });

  it("apresenta produtos em atenção", () => {
    const response = generateAssistantResponse(
      { type: "list_by_status", status: "warning" },
      analysis,
    );

    expect(response.message).toContain("Feijão 1 kg");
    expect(response.message).toContain("6,67%");
  });

  it("apresenta produtos saudáveis", () => {
    const response = generateAssistantResponse(
      { type: "list_by_status", status: "healthy" },
      analysis,
    );

    expect(response.message).toContain("Arroz 5 kg");
    expect(response.message).toContain("20,00%");
  });

  it("trata ausência de produtos no status solicitado", () => {
    const response = generateAssistantResponse(
      { type: "list_by_status", status: "loss" },
      emptyAnalysis,
    );

    expect(response.message).toContain(
      "Não encontrei produtos em prejuízo",
    );
  });

  it("retorna ação de filtragem sem alterar o dashboard", () => {
    const response = generateAssistantResponse(
      { type: "filter_by_status", status: "loss" },
      analysis,
    );

    expect(response.action).toEqual({
      type: "apply_filter",
      status: "loss",
    });
  });

  it("retorna ação para limpar filtros", () => {
    const response = generateAssistantResponse(
      { type: "show_all" },
      analysis,
    );

    expect(response.action).toEqual({
      type: "clear_filters",
    });
  });

  it("trata resumos sem produtos válidos", () => {
    const response = generateAssistantResponse(
      { type: "summary" },
      emptyAnalysis,
    );

    expect(response.message).toContain(
      "0 produtos válidos",
    );
    expect(response.message).toContain(
      "Margem média: indisponível",
    );
  });

  it("não retorna ações para intenções desconhecidas", () => {
    const response = generateAssistantResponse(
      { type: "unknown" },
      analysis,
    );

    expect(response.action).toBeUndefined();
    expect(response.message).toContain(
      "Não consegui interpretar",
    );
  });
});

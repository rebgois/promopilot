
import { describe, expect, it } from "vitest";

import products from "../../promotions/data/products.json";
import { analyzePromotions } from "../../promotions/domain/analyzePromotions";

import { processAssistantMessage } from "./processAssistantMessage";

const analysis = analyzePromotions(products);

describe("Processamento de mensagens do assistente", () => {
  it("identifica produtos em prejuízo", () => {
    const response = processAssistantMessage(
      "Quais produtos estão em prejuízo?",
      analysis,
    );

    expect(response.message).toContain("Café 500 g");
    expect(response.message).toContain("-7,14%");
    expect(
  response.message.replace(/\u00A0|\u202F/g, " "),
).toContain("R$ 1,00");
  });

  it("retorna uma ação para filtrar produtos", () => {
    const response = processAssistantMessage(
      "Filtre os produtos em prejuízo",
      analysis,
    );

    expect(response.action).toEqual({
      type: "apply_filter",
      status: "loss",
    });
  });

  it("retorna um resumo comercial", () => {
    const response = processAssistantMessage(
      "Me dê um resumo",
      analysis,
    );

    expect(response.message).toContain("5 registros recebidos");
    expect(response.message).toContain("3 produtos válidos");
    expect(response.message).toContain("2 registros inválidos");
  });

  it("trata perguntas não reconhecidas", () => {
    const response = processAssistantMessage(
      "Qual é a previsão do tempo?",
      analysis,
    );

    expect(response.message).toContain(
      "Não consegui interpretar",
    );
    expect(response.action).toBeUndefined();
  });
});

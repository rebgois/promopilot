
import { describe, expect, it } from "vitest";

import { interpretMessage } from "./interpretMessage";

describe("Interpretação de intenções comerciais", () => {
  it.each(["Oi", "Olá!", "Bom dia"])(
    "reconhece a saudação: %s",
    (message) => {
      expect(interpretMessage(message)).toEqual({
        type: "greeting",
      });
    },
  );

  it.each([
    "Quais produtos estão em prejuízo?",
    "Produtos com margem negativa",
    "Quais produtos estão dando perda?",
  ])("identifica consultas de prejuízo: %s", (message) => {
    expect(interpretMessage(message)).toEqual({
      type: "list_by_status",
      status: "loss",
    });
  });

  it("identifica consultas de margem baixa", () => {
    expect(
      interpretMessage("Quais produtos têm margem baixa?"),
    ).toEqual({
      type: "list_by_status",
      status: "warning",
    });
  });

  it("identifica produtos saudáveis", () => {
    expect(
      interpretMessage("Mostre produtos saudáveis"),
    ).toEqual({
      type: "list_by_status",
      status: "healthy",
    });
  });

  it("diferencia consultas de comandos de filtro", () => {
    expect(
      interpretMessage("Filtre os produtos em prejuízo"),
    ).toEqual({
      type: "filter_by_status",
      status: "loss",
    });
  });

  it("reconhece comandos para limpar filtros", () => {
    expect(
      interpretMessage("Limpar filtros"),
    ).toEqual({
      type: "show_all",
    });
  });

  it("reconhece solicitações de resumo", () => {
    expect(
      interpretMessage("Me dê um resumo comercial"),
    ).toEqual({
      type: "summary",
    });
  });

  it("não interpreta mensagens vazias", () => {
    expect(interpretMessage("")).toEqual({
      type: "unknown",
    });
  });

  it("não inventa intenções desconhecidas", () => {
    expect(
      interpretMessage("Qual é a previsão do tempo?"),
    ).toEqual({
      type: "unknown",
    });
  });
});

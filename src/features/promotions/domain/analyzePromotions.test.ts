
import { describe, expect, it } from "vitest";

import products from "../data/products.json";
import { analyzePromotions } from "./analyzePromotions";

describe("Análise de promoções em lote", () => {
  it("processa produtos válidos e identifica inválidos", () => {
    const result = analyzePromotions(products);

    expect(result.summary.total).toBe(5);
    expect(result.summary.valid).toBe(3);
    expect(result.summary.invalid).toBe(2);

    expect(result.summary.healthy).toBe(1);
    expect(result.summary.warning).toBe(1);
    expect(result.summary.loss).toBe(1);

    expect(result.summary.averageMargin).toBeCloseTo(
      6.5079365,
    );
  });

  it("preserva os motivos dos registros inválidos", () => {
    const result = analyzePromotions(products);

    expect(result.invalidProducts).toHaveLength(2);

    expect(
      result.invalidProducts.find(
        (product) => product.sku === "004",
      )?.errors.some(
        (error) => error.field === "preco_promocional",
      ),
    ).toBe(true);

    expect(
      result.invalidProducts.find(
        (product) => product.sku === "005",
      )?.errors.some(
        (error) => error.field === "preco_promocional",
      ),
    ).toBe(true);
  });

  it("não interrompe o processamento quando um produto é inválido", () => {
    const result = analyzePromotions([
      {
        sku: "001",
        nome: "Produto válido",
        custo: 10,
        preco_atual: 20,
        preco_promocional: 15,
      },
      {
        sku: "002",
        nome: "Produto inválido",
        custo: 10,
        preco_atual: 20,
        preco_promocional: 0,
      },
    ]);

    expect(result.products).toHaveLength(1);
    expect(result.invalidProducts).toHaveLength(1);
  });

  it("retorna margem média nula quando não existem produtos válidos", () => {
    const result = analyzePromotions([]);

    expect(result.summary.averageMargin).toBeNull();
    expect(result.products).toHaveLength(0);
  });

  it("trata entradas que não são listas", () => {
    const result = analyzePromotions(null);

    expect(result.products).toHaveLength(0);
    expect(result.invalidProducts).toHaveLength(1);
    expect(result.invalidProducts[0].errors[0].field).toBe(
      "root",
    );
  });
});

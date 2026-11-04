
import { describe, expect, it } from "vitest";

import {
  analyzePromotion,
  calculateDiscount,
  calculateMargin,
  calculateUnitProfit,
  classifyPromotion,
} from "./analyzePromotion";

describe("Cálculos comerciais", () => {
  it("calcula corretamente o desconto percentual", () => {
    expect(calculateDiscount(28, 25)).toBeCloseTo(10.7142857);
  });

  it("calcula corretamente a margem percentual", () => {
    expect(calculateMargin(7, 7.5)).toBeCloseTo(6.6666667);
  });

  it("calcula corretamente o lucro bruto unitário", () => {
    expect(calculateUnitProfit(15, 14)).toBe(-1);
  });
});

describe("Classificação de promoções", () => {
  it("classifica margem acima de 15% como saudável", () => {
    expect(classifyPromotion(20)).toBe("healthy");
  });

  it("classifica margem exatamente igual a 15% como saudável", () => {
    expect(classifyPromotion(15)).toBe("healthy");
  });

  it("classifica margem abaixo de 15% como atenção", () => {
    expect(classifyPromotion(14.99)).toBe("warning");
  });

  it("classifica margem igual a zero como atenção", () => {
    expect(classifyPromotion(0)).toBe("warning");
  });

  it("classifica margem negativa como prejuízo", () => {
    expect(classifyPromotion(-0.01)).toBe("loss");
  });
});

describe("Análise individual", () => {
  it("analisa corretamente uma promoção com prejuízo", () => {
    const result = analyzePromotion({
      sku: "003",
      nome: "Café 500 g",
      custo: 15,
      preco_atual: 22,
      preco_promocional: 14,
    });

    expect(result.discountPercentage).toBeCloseTo(36.363636);
    expect(result.marginPercentage).toBeCloseTo(-7.142857);
    expect(result.unitProfit).toBe(-1);
    expect(result.status).toBe("loss");
  });
});

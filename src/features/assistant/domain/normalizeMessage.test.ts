
import { describe, expect, it } from "vitest";

import { normalizeMessage } from "./normalizeMessage";

describe("Normalização de mensagens", () => {
  it("remove acentos e converte para minúsculas", () => {
    expect(
      normalizeMessage("PROMOÇÕES EM ATENÇÃO"),
    ).toBe("promocoes em atencao");
  });

  it("remove pontuação", () => {
    expect(
      normalizeMessage("Olá! Tudo bem?"),
    ).toBe("ola tudo bem");
  });

  it("normaliza espaços repetidos", () => {
    expect(
      normalizeMessage("  produtos    em   prejuízo  "),
    ).toBe("produtos em prejuizo");
  });

  it("retorna string vazia para entrada vazia", () => {
    expect(normalizeMessage("   ")).toBe("");
  });

  it("preserva números e identificadores", () => {
    expect(
      normalizeMessage("Produto SKU 003"),
    ).toBe("produto sku 003");
  });
});

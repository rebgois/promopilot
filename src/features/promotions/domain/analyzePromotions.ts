
import { analyzePromotion } from "./analyzePromotion";
import { validatePromotions } from "./validatePromotions";

import type {
  PromotionAnalysisResult,
  PromotionSummary,
} from "./promotion.types";

export function analyzePromotions(
  input: unknown,
): PromotionAnalysisResult {
  const { valid, invalid } = validatePromotions(input);

  const products = valid.map(analyzePromotion);

  const marginSum = products.reduce(
    (sum, product) => sum + product.marginPercentage,
    0,
  );

  const summary: PromotionSummary = {
    total: valid.length + invalid.length,
    valid: valid.length,
    invalid: invalid.length,
    healthy: products.filter(
      (product) => product.status === "healthy",
    ).length,
    warning: products.filter(
      (product) => product.status === "warning",
    ).length,
    loss: products.filter(
      (product) => product.status === "loss",
    ).length,
    averageMargin:
      products.length > 0
        ? marginSum / products.length
        : null,
  };

  return {
    products,
    invalidProducts: invalid,
    summary,
  };
}

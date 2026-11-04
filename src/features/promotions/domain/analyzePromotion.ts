
import type { Promotion } from "./promotion.schema";
import type {
  AnalyzedPromotion,
  PromotionStatus,
} from "./promotion.types";

export function calculateDiscount(
  currentPrice: number,
  promotionalPrice: number,
): number {
  return ((currentPrice - promotionalPrice) / currentPrice) * 100;
}

export function calculateMargin(
  cost: number,
  promotionalPrice: number,
): number {
  return ((promotionalPrice - cost) / promotionalPrice) * 100;
}

export function calculateUnitProfit(
  cost: number,
  promotionalPrice: number,
): number {
  return promotionalPrice - cost;
}

export function classifyPromotion(
  margin: number,
): PromotionStatus {
  if (margin >= 15) return "healthy";
  if (margin >= 0) return "warning";

  return "loss";
}

export function analyzePromotion(
  promotion: Promotion,
): AnalyzedPromotion {
  const discountPercentage = calculateDiscount(
    promotion.preco_atual,
    promotion.preco_promocional,
  );

  const marginPercentage = calculateMargin(
    promotion.custo,
    promotion.preco_promocional,
  );

  const unitProfit = calculateUnitProfit(
    promotion.custo,
    promotion.preco_promocional,
  );

  return {
    ...promotion,
    discountPercentage,
    marginPercentage,
    unitProfit,
    status: classifyPromotion(marginPercentage),
  };
}

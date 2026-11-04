
import type { Promotion } from "./promotion.schema";

export interface ValidationError {
  field: string;
  message: string;
}

export interface InvalidPromotion {
  index: number;
  sku?: string;
  errors: ValidationError[];
}

export interface ValidationResult {
  valid: Promotion[];
  invalid: InvalidPromotion[];
}

export type PromotionStatus =
  | "healthy"
  | "warning"
  | "loss";

export interface AnalyzedPromotion extends Promotion {
  discountPercentage: number;
  marginPercentage: number;
  unitProfit: number;
  status: PromotionStatus;
}

export interface PromotionSummary {
  total: number;
  valid: number;
  invalid: number;
  healthy: number;
  warning: number;
  loss: number;
  averageMargin: number | null;
}

export interface PromotionAnalysisResult {
  products: AnalyzedPromotion[];
  invalidProducts: InvalidPromotion[];
  summary: PromotionSummary;
}

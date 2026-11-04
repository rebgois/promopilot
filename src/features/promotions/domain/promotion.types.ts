
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

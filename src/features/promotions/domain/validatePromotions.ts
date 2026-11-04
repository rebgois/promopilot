
import { promotionSchema } from "./promotion.schema";

import type {
  InvalidPromotion,
  ValidationResult,
} from "./promotion.types";

export function validatePromotions(
  input: unknown,
): ValidationResult {
  if (!Array.isArray(input)) {
    return {
      valid: [],
      invalid: [
        {
          index: -1,
          errors: [
            {
              field: "root",
              message: "A entrada deve ser uma lista de produtos",
            },
          ],
        },
      ],
    };
  }

  const result: ValidationResult = {
    valid: [],
    invalid: [],
  };

  input.forEach((item: unknown, index) => {
    const parsed = promotionSchema.safeParse(item);

    if (parsed.success) {
      result.valid.push(parsed.data);
      return;
    }

    const invalidProduct: InvalidPromotion = {
      index,
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join(".") || "root",
        message: issue.message,
      })),
    };

    if (
      typeof item === "object" &&
      item !== null &&
      "sku" in item &&
      typeof item.sku === "string"
    ) {
      invalidProduct.sku = item.sku;
    }

    result.invalid.push(invalidProduct);
  });

  return result;
}

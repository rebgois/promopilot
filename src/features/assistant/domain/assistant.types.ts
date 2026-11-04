
import type { PromotionStatus } from "../../promotions/domain/promotion.types";

export type AssistantIntent =
  | { type: "greeting" }
  | { type: "list_by_status"; status: PromotionStatus }
  | { type: "filter_by_status"; status: PromotionStatus }
  | { type: "show_all" }
  | { type: "summary" }
  | { type: "unknown" };

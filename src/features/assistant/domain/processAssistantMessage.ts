
import type { PromotionAnalysisResult } from "../../promotions/domain/promotion.types";

import type { AssistantResponse } from "./assistant.types";

import { interpretMessage } from "./interpretMessage";
import { generateAssistantResponse } from "./generateAssistantResponse";

export function processAssistantMessage(
  message: string,
  analysis: PromotionAnalysisResult,
): AssistantResponse {
  const intent = interpretMessage(message);

  return generateAssistantResponse(intent, analysis);
}

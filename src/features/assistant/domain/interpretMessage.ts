
import type { PromotionStatus } from "../../promotions/domain/promotion.types";

import type { AssistantIntent } from "./assistant.types";
import { normalizeMessage } from "./normalizeMessage";

const statusPatterns: Array<{
  status: PromotionStatus;
  patterns: RegExp[];
}> = [
  {
    status: "loss",
    patterns: [
      /\bprejuizo\b/,
      /\bmargem negativa\b/,
      /\bperda\b/,
    ],
  },
  {
    status: "warning",
    patterns: [
      /\batencao\b/,
      /\bmargem baixa\b/,
      /\bmargens baixas\b/,
    ],
  },
  {
    status: "healthy",
    patterns: [
      /\bsaudaveis?\b/,
      /\bmargem boa\b/,
      /\bmargens boas\b/,
    ],
  },
];

function identifyStatus(
  message: string,
): PromotionStatus | null {
  const match = statusPatterns.find(({ patterns }) =>
    patterns.some((pattern) => pattern.test(message)),
  );

  return match?.status ?? null;
}

export function interpretMessage(
  message: string,
): AssistantIntent {
  const normalized = normalizeMessage(message);

  if (!normalized) {
    return { type: "unknown" };
  }

  if (/^(oi|ola|bom dia|boa tarde|boa noite)$/.test(normalized)) {
    return { type: "greeting" };
  }

  if (
    /\b(limpar filtros|remover filtros|mostrar todos|ver todos)\b/.test(
      normalized,
    )
  ) {
    return { type: "show_all" };
  }

  const status = identifyStatus(normalized);

  if (status) {
    const isFilterCommand =
      /\b(filtrar|filtre|aplicar filtro|mostrar apenas|exibir apenas)\b/.test(
        normalized,
      );

    return isFilterCommand
      ? { type: "filter_by_status", status }
      : { type: "list_by_status", status };
  }

  if (
    /\b(resumo|visao geral|panorama|indicadores)\b/.test(
      normalized,
    )
  ) {
    return { type: "summary" };
  }

  return { type: "unknown" };
}

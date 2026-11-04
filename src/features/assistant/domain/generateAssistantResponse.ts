
import type {
  PromotionAnalysisResult,
  PromotionStatus,
} from "../../promotions/domain/promotion.types";

import {
  formatCurrency,
  formatPercentage,
} from "../../promotions/utils/formatters";

import type {
  AssistantIntent,
  AssistantResponse,
} from "./assistant.types";

const statusLabels: Record<PromotionStatus, string> = {
  healthy: "saudáveis",
  warning: "em atenção",
  loss: "em prejuízo",
};

function generateStatusResponse(
  status: PromotionStatus,
  analysis: PromotionAnalysisResult,
): string {
  const products = analysis.products.filter(
    (product) => product.status === status,
  );

  if (products.length === 0) {
    return `Não encontrei produtos ${statusLabels[status]}.`;
  }

  const details = products.map((product) => {
    const profitDescription =
      product.unitProfit < 0
        ? `perda de ${formatCurrency(Math.abs(product.unitProfit))}`
        : `lucro de ${formatCurrency(product.unitProfit)}`;

    return (
      `${product.nome} (SKU ${product.sku}): ` +
      `margem de ${formatPercentage(product.marginPercentage)} ` +
      `e ${profitDescription} por unidade.`
    );
  });

  return [
    `Encontrei ${products.length} produto(s) ${statusLabels[status]}:`,
    ...details,
  ].join("\n");
}

function generateSummary(
  analysis: PromotionAnalysisResult,
): string {
  const { summary } = analysis;

  const averageMargin =
    summary.averageMargin === null
      ? "indisponível"
      : formatPercentage(summary.averageMargin);

  return [
    "Resumo das promoções:",
    `• ${summary.total} registros recebidos.`,
    `• ${summary.valid} produtos válidos.`,
    `• ${summary.invalid} registros inválidos.`,
    `• ${summary.healthy} promoções saudáveis.`,
    `• ${summary.warning} promoções em atenção.`,
    `• ${summary.loss} promoções em prejuízo.`,
    `• Margem média: ${averageMargin}.`,
  ].join("\n");
}

export function generateAssistantResponse(
  intent: AssistantIntent,
  analysis: PromotionAnalysisResult,
): AssistantResponse {
  switch (intent.type) {
    case "greeting":
      return {
        message:
          "Olá! Sou o assistente comercial do PromoPilot. " +
          "Posso apresentar um resumo das promoções, " +
          "identificar produtos com prejuízo ou ajudar " +
          "a filtrar o dashboard.",
      };

    case "summary":
      return {
        message: generateSummary(analysis),
      };

    case "list_by_status":
      return {
        message: generateStatusResponse(intent.status, analysis),
      };

    case "filter_by_status":
      return {
        message:
          `Vou filtrar o dashboard para exibir produtos ` +
          `${statusLabels[intent.status]}.`,
        action: {
          type: "apply_filter",
          status: intent.status,
        },
      };

    case "show_all":
      return {
        message:
          "Vou limpar os filtros e exibir todos os produtos válidos.",
        action: {
          type: "clear_filters",
        },
      };

    case "unknown":
      return {
        message:
          "Não consegui interpretar sua solicitação. " +
          "Você pode perguntar sobre produtos em prejuízo, " +
          "margens baixas ou solicitar um resumo comercial.",
      };
  }
}

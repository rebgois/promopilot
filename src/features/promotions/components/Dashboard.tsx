
import { lazy, Suspense, useMemo } from "react";

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { usePromotionFiltersStore } from "../store/src/features/promotions/store/usePromotionFiltersStore";
import products from "../data/products.json";
import { analyzePromotions } from "../domain/analyzePromotions";
import { formatPercentage } from "../utils/formatters";

import { MetricCard } from "./MetricCard";
import { PromotionsTable } from "./PromotionsTable";
import { InvalidPromotions } from "./InvalidPromotions";

const analysis = analyzePromotions(products);

const AssistantChat = lazy(() =>
  import("../../assistant/components/AssistantChat").then(
    (module) => ({
      default: module.AssistantChat,
    }),
  ),
);

export function Dashboard() {
  const { summary } = analysis;

  const averageMargin =
    summary.averageMargin === null
      ? "—"
      : formatPercentage(summary.averageMargin);

  // Estado compartilhado com o assistente
  const search = usePromotionFiltersStore(
    (state) => state.search,
  );

  const status = usePromotionFiltersStore(
    (state) => state.statusFilter,
  );

  // Ações para atualizar os filtros
  const setSearch = usePromotionFiltersStore(
    (state) => state.setSearch,
  );

  const setStatus = usePromotionFiltersStore(
    (state) => state.setStatusFilter,
  );

  const clearFilters = usePromotionFiltersStore(
    (state) => state.clearFilters,
  );

  // Filtragem dos produtos analisados
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase("pt-BR");

    return analysis.products.filter((product) => {
      const matchesSearch =
        product.nome
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch) ||
        product.sku
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        product.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <Stack spacing={4}>
      {/* Cabeçalho do dashboard */}
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Visão geral
            </Typography>

            <Typography color="text.secondary">
              Acompanhe a rentabilidade das promoções
              e identifique oportunidades de melhoria.
            </Typography>
          </Box>

          <Chip
            label="Dados demonstrativos"
            variant="outlined"
            color="primary"
          />
        </Stack>
      </Box>

      {/* Indicadores comerciais */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        <MetricCard
          title="Produtos válidos"
          value={summary.valid}
          description={`${summary.total} registros recebidos`}
          icon={
            <Inventory2OutlinedIcon color="primary" />
          }
        />

        <MetricCard
          title="Margem média"
          value={averageMargin}
          description="Média dos produtos válidos"
          icon={
            <TrendingUpOutlinedIcon color="primary" />
          }
        />

        <MetricCard
          title="Produtos em atenção"
          value={summary.warning}
          description="Margem entre 0% e 15%"
          icon={
            <WarningAmberOutlinedIcon color="warning" />
          }
        />

        <MetricCard
          title="Produtos em prejuízo"
          value={summary.loss}
          description="Margem negativa"
          icon={
            <ErrorOutlineOutlinedIcon color="error" />
          }
        />
      </Box>

      {/* Tabela de produtos analisados */}
      <PromotionsTable
        products={filteredProducts}
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onClearFilters={clearFilters}
      />

      {/* Registros inválidos */}
      <InvalidPromotions
        products={analysis.invalidProducts}
      />

      {/* Assistente comercial */}
      <Suspense fallback={null}>
        <AssistantChat />
      </Suspense>
    </Stack>
  );
}

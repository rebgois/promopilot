
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

import products from "../data/products.json";
import { analyzePromotions } from "../domain/analyzePromotions";
import { formatPercentage } from "../utils/formatters";
import { usePromotionFiltersStore } from "../store/src/features/promotions/store/usePromotionFiltersStore";

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

  const search = usePromotionFiltersStore(
    (state) => state.search,
  );

  const status = usePromotionFiltersStore(
    (state) => state.statusFilter,
  );

  const setSearch = usePromotionFiltersStore(
    (state) => state.setSearch,
  );

  const setStatus = usePromotionFiltersStore(
    (state) => state.setStatusFilter,
  );

  const clearFilters = usePromotionFiltersStore(
    (state) => state.clearFilters,
  );

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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          pt: { xs: 1, md: 2 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
          >
            Visão geral
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Acompanhe a rentabilidade das promoções
            e identifique oportunidades de melhoria.
          </Typography>
        </Box>

        <Chip
          label="Dados demonstrativos"
          size="small"
          sx={{
            bgcolor: "#F0EDFF",
            color: "#6045E8",
            fontWeight: 600,
            border: "1px solid #E3DCFF",
            px: 0.5,
          }}
        />
      </Stack>

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
          tone="purple"
          icon={<Inventory2OutlinedIcon />}
        />

        <MetricCard
          title="Margem média"
          value={averageMargin}
          description="Média dos produtos válidos"
          tone="blue"
          icon={<TrendingUpOutlinedIcon />}
        />

        <MetricCard
          title="Produtos em atenção"
          value={summary.warning}
          description="Margem entre 0% e 15%"
          tone="orange"
          icon={<WarningAmberOutlinedIcon />}
        />

        <MetricCard
          title="Produtos em prejuízo"
          value={summary.loss}
          description="Margem negativa"
          tone="red"
          icon={<ErrorOutlineOutlinedIcon />}
        />
      </Box>

      <PromotionsTable
        products={filteredProducts}
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onClearFilters={clearFilters}
      />

      <InvalidPromotions
        products={analysis.invalidProducts}
      />

      <Suspense fallback={null}>
        <AssistantChat />
      </Suspense>
    </Stack>
  );
}


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
import { MetricCard } from "./MetricCard";

const analysis = analyzePromotions(products);

export function Dashboard() {
  const { summary } = analysis;

  const averageMargin =
    summary.averageMargin === null
      ? "—"
      : `${summary.averageMargin.toFixed(2)}%`;

  return (
    <Stack spacing={4}>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
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
          icon={<Inventory2OutlinedIcon color="primary" />}
        />

        <MetricCard
          title="Margem média"
          value={averageMargin}
          description="Média dos produtos válidos"
          icon={<TrendingUpOutlinedIcon color="primary" />}
        />

        <MetricCard
          title="Produtos em atenção"
          value={summary.warning}
          description="Margem entre 0% e 15%"
          icon={<WarningAmberOutlinedIcon color="warning" />}
        />

        <MetricCard
          title="Produtos em prejuízo"
          value={summary.loss}
          description="Margem negativa"
          icon={<ErrorOutlineOutlinedIcon color="error" />}
        />
      </Box>
    </Stack>
  );
}

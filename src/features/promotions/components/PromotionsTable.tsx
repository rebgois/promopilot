
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { AnalyzedPromotion } from "../domain/promotion.types";
import {
  formatCurrency,
  formatPercentage,
} from "../utils/formatters";

import { PromotionStatusChip } from "./PromotionStatusChip";

interface PromotionsTableProps {
  products: AnalyzedPromotion[];
}

export function PromotionsTable({
  products,
}: PromotionsTableProps) {
  return (
    <Paper variant="outlined">
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">
          Produtos analisados
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Detalhamento das promoções e suas margens.
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Custo</TableCell>
              <TableCell align="right">Preço atual</TableCell>
              <TableCell align="right">Preço promo.</TableCell>
              <TableCell align="right">Desconto</TableCell>
              <TableCell align="right">Margem</TableCell>
              <TableCell align="right">Lucro un.</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow hover key={product.sku}>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.nome}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    SKU: {product.sku}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  {formatCurrency(product.custo)}
                </TableCell>

                <TableCell align="right">
                  {formatCurrency(product.preco_atual)}
                </TableCell>

                <TableCell align="right">
                  {formatCurrency(product.preco_promocional)}
                </TableCell>

                <TableCell align="right">
                  {formatPercentage(product.discountPercentage)}
                </TableCell>

                <TableCell align="right">
                  <Typography
                    sx={{ fontWeight: 600 }}
                    color={
                      product.marginPercentage < 0
                        ? "error.main"
                        : "text.primary"
                    }
                  >
                    {formatPercentage(product.marginPercentage)}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  {formatCurrency(product.unitProfit)}
                </TableCell>

                <TableCell>
                  <PromotionStatusChip status={product.status} />
                </TableCell>
              </TableRow>
            ))}

            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

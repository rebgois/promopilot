
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

import type { AnalyzedPromotion } from "../domain/promotion.types";

import {
  formatCurrency,
  formatPercentage,
} from "../utils/formatters";

import {
  PromotionsFilters,
  type StatusFilter,
} from "./PromotionsFilters";

import { PromotionStatusChip } from "./PromotionStatusChip";

interface PromotionsTableProps {
  products: AnalyzedPromotion[];
  search: string;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onClearFilters: () => void;
}

export function PromotionsTable({
  products,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onClearFilters,
}: PromotionsTableProps) {
  const hasActiveFilters =
    search.trim() !== "" || status !== "all";

  const productsCount =
    products.length === 1
      ? "1 produto encontrado."
      : `${products.length} produtos encontrados.`;

  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: "hidden",
        borderRadius: "22px",
        borderColor: "divider",
        boxShadow: "0 8px 32px rgba(32, 36, 58, 0.045)",
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              id="promotions-table-title"
            >
              Produtos analisados
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              sx={{ mt: 0.5 }}
            >
              {productsCount}
            </Typography>
          </Box>

          <PromotionsFilters
            search={search}
            status={status}
            onSearchChange={onSearchChange}
            onStatusChange={onStatusChange}
            onClear={onClearFilters}
          />
        </Stack>
      </Box>

      {products.length === 0 ? (
        <Box
          role="status"
          sx={{
            px: 3,
            py: 7,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <SearchOffOutlinedIcon
            sx={{
              fontSize: 44,
              color: "text.disabled",
            }}
          />

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              Nenhum produto encontrado
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {hasActiveFilters
                ? "Nenhum produto corresponde aos filtros selecionados. Tente ajustar sua busca ou limpar os filtros."
                : "Não há produtos disponíveis para exibição."}
            </Typography>
          </Box>

          {hasActiveFilters && (
            <Button
              variant="outlined"
              startIcon={<FilterAltOffIcon />}
              onClick={onClearFilters}
            >
              Limpar filtros
            </Button>
          )}
        </Box>
      ) : (
        <>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table
              aria-labelledby="promotions-table-title"
              size="small"
              sx={{
                minWidth: 900,
                "& .MuiTableCell-root": {
                  py: 2,
                },
                "& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)": {
                  backgroundColor: "#FAFBFD",
                },
                "& .MuiTableBody-root .MuiTableRow-root:hover": {
                  backgroundColor: "#F3F4F8",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell scope="col">Produto</TableCell>
                  <TableCell scope="col" align="right">
                    Custo
                  </TableCell>
                  <TableCell scope="col" align="right">
                    Preço atual
                  </TableCell>
                  <TableCell scope="col" align="right">
                    Preço promo.
                  </TableCell>
                  <TableCell scope="col" align="right">
                    Desconto
                  </TableCell>
                  <TableCell scope="col" align="right">
                    Margem
                  </TableCell>
                  <TableCell scope="col" align="right">
                    Lucro un.
                  </TableCell>
                  <TableCell scope="col">Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow hover key={product.sku}>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700 }}
                      >
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
                      {formatCurrency(
                        product.preco_promocional,
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {formatPercentage(
                        product.discountPercentage,
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700 }}
                        color={
                          product.marginPercentage < 0
                            ? "error.main"
                            : "text.primary"
                        }
                      >
                        {formatPercentage(
                          product.marginPercentage,
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color={
                          product.unitProfit < 0
                            ? "error.main"
                            : "text.primary"
                        }
                        sx={{
                          fontWeight:
                            product.unitProfit < 0 ? 700 : 400,
                        }}
                      >
                        {formatCurrency(product.unitProfit)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <PromotionStatusChip
                        status={product.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              px: 2,
              py: 1.5,
              textAlign: "center",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Deslize horizontalmente para visualizar
              todas as colunas.
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
}


import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import type { InvalidPromotion } from "../domain/promotion.types";

interface InvalidPromotionsProps {
  products: InvalidPromotion[];
}

export function InvalidPromotions({
  products,
}: InvalidPromotionsProps) {
  if (products.length === 0) {
    return (
      <Alert severity="success" variant="outlined">
        Todos os registros foram validados com sucesso.
      </Alert>
    );
  }

  return (
    <Paper variant="outlined">
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <ErrorOutlineOutlinedIcon color="error" />

              <Typography variant="h6">
                Registros inválidos
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Produtos que não atenderam aos critérios
              de validação e não foram incluídos na análise.
            </Typography>
          </Box>

          <Chip
            label={`${products.length} rejeitado(s)`}
            color="error"
            variant="outlined"
          />
        </Stack>

        <Alert severity="warning" variant="outlined">
          <AlertTitle>Atenção à qualidade dos dados</AlertTitle>
          Os registros abaixo precisam ser corrigidos antes
          de serem considerados nos indicadores comerciais.
        </Alert>

        <Stack divider={<Divider flexItem />} spacing={2}>
          {products.map((product) => (
            <Box key={`${product.index}-${product.sku ?? "unknown"}`}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 600 }}>
                  {product.sku
                    ? `SKU: ${product.sku}`
                    : `Registro ${product.index + 1}`}
                </Typography>

                {product.errors.map((error, index) => (
                  <Typography
                    key={`${error.field}-${index}`}
                    variant="body2"
                    color="text.secondary"
                  >
                    <Box
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      {error.field}:
                    </Box>{" "}
                    {error.message}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

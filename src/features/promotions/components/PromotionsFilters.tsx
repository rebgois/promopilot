
import {
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import type { PromotionStatus } from "../domain/promotion.types";

export type StatusFilter = PromotionStatus | "all";

interface PromotionsFiltersProps {
  search: string;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onClear: () => void;
}

export function PromotionsFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onClear,
}: PromotionsFiltersProps) {
  const hasActiveFilters =
    search.trim() !== "" || status !== "all";

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      component="section"
      aria-label="Filtros de produtos"
      sx={{
        alignItems: {
          xs: "stretch",
          md: "center",
        },
      }}
    >
      <TextField
        label="Buscar produtos"
        placeholder="Nome ou SKU"
        size="small"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        slotProps={{
          htmlInput: {
            "aria-label":
              "Buscar produtos por nome ou SKU",
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  aria-hidden="true"
                />
              </InputAdornment>
            ),
          },
        }}
        sx={{ flex: 1 }}
      />

      <TextField
        select
        label="Classificação"
        size="small"
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target.value as StatusFilter,
          )
        }
        slotProps={{
          select: {
            "aria-label":
              "Filtrar produtos por classificação",
          },
        }}
        sx={{
          minWidth: { md: 180 },
        }}
      >
        <MenuItem value="all">
          Todos os status
        </MenuItem>
        <MenuItem value="healthy">
          Saudável
        </MenuItem>
        <MenuItem value="warning">
          Atenção
        </MenuItem>
        <MenuItem value="loss">
          Prejuízo
        </MenuItem>
      </TextField>

      <Button
        variant="outlined"
        color="inherit"
        startIcon={<FilterAltOffIcon />}
        onClick={onClear}
        disabled={!hasActiveFilters}
        sx={{
          minHeight: 40,
          whiteSpace: "nowrap",
        }}
      >
        Limpar filtros
      </Button>
    </Stack>
  );
}

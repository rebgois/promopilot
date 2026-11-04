
import { Chip } from "@mui/material";

import type { PromotionStatus } from "../domain/promotion.types";

interface PromotionStatusChipProps {
  status: PromotionStatus;
}

const statusConfig = {
  healthy: {
    label: "Saudável",
    color: "success",
  },
  warning: {
    label: "Atenção",
    color: "warning",
  },
  loss: {
    label: "Prejuízo",
    color: "error",
  },
} as const;

export function PromotionStatusChip({
  status,
}: PromotionStatusChipProps) {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="outlined"
    />
  );
}


import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  description,
}: MetricCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            {icon}
          </Stack>

          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>

          {description && (
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {description}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

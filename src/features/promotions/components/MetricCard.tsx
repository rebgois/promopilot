
import type { ReactNode } from "react";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

type MetricTone = "purple" | "blue" | "orange" | "red";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  tone?: MetricTone;
}

const toneStyles = {
  purple: {
    color: "#6045E8",
    background: "#F0EDFF",
  },
  blue: {
    color: "#2563EB",
    background: "#EFF6FF",
  },
  orange: {
    color: "#B45309",
    background: "#FFF7ED",
  },
  red: {
    color: "#DC2626",
    background: "#FEF2F2",
  },
} satisfies Record<
  MetricTone,
  {
    color: string;
    background: string;
  }
>;

export function MetricCard({
  title,
  value,
  icon,
  description,
  tone = "purple",
}: MetricCardProps) {
  const colors = toneStyles[tone];

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: "20px",
        backgroundColor: "background.paper",
        backgroundImage: "none",
        borderColor: "divider",
        boxShadow: "0 4px 18px rgba(32, 36, 58, 0.035)",
        transition:
          "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 28px rgba(32, 36, 58, 0.08)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          "&:last-child": { pb: 2.5 },
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>

            {icon && (
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.color,
                  backgroundColor: colors.background,
                  "& svg": {
                    fontSize: 23,
                  },
                }}
              >
                {icon}
              </Box>
            )}
          </Stack>

          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                fontWeight: 800,
                mb: 0.5,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {value}
            </Typography>

            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {description}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

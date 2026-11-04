
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
    background: "#F4EFFF",
    border: "#DDD0FF",
    icon: "#5B21D8",
    iconBackground: "#E9DFFF",
  },
  blue: {
    background: "#EFF6FF",
    border: "#CFE3FF",
    icon: "#2563EB",
    iconBackground: "#DBEAFE",
  },
  orange: {
    background: "#FFF7ED",
    border: "#FED7AA",
    icon: "#EA580C",
    iconBackground: "#FFEDD5",
  },
  red: {
    background: "#FFF1F2",
    border: "#FECDD3",
    icon: "#DC2626",
    iconBackground: "#FFE4E6",
  },
} satisfies Record<
  MetricTone,
  {
    background: string;
    border: string;
    icon: string;
    iconBackground: string;
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
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
  }}
>

      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
            spacing={1}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>

            {icon && (
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.icon,
                  backgroundColor: colors.iconBackground,
                  "& svg": {
                    fontSize: 24,
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
                fontWeight: 800,
                color: "text.primary",
                mb: 0.5,
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

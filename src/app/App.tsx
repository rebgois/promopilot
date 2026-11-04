
import {
  AppBar,
  Box,
  Chip,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import { Dashboard } from "../features/promotions/components/Dashboard";
import { theme } from "./theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <AutoGraphIcon
              color="primary"
              sx={{ mr: 1.5 }}
            />

            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
            >
              PromoPilot
            </Typography>

            <Chip
              label="Ambiente de demonstração"
              color="primary"
              variant="outlined"
              size="small"
            />
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 3, md: 5 },
          }}
        >
          <Stack spacing={3}>
            <Dashboard />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

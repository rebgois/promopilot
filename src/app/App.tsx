
import {
  AppBar,
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import AutoGraphIcon from "@mui/icons-material/AutoGraph";

export function App() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar>
          <AutoGraphIcon color="primary" sx={{ mr: 1.5 }} />

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
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

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Inteligência de Promoções
            </Typography>

            <Typography color="text.secondary">
              Analise margens, identifique riscos e tome
              decisões comerciais com mais segurança.
            </Typography>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              p: 4,
              minHeight: 280,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6">
                Análise de promoções
              </Typography>

              <Typography color="text.secondary">
                Os indicadores comerciais serão
                apresentados aqui.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}


import {
  AppBar,
  Box,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dashboard } from "../features/promotions/components/Dashboard";
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
          <Dashboard />
          
            </Stack>
      </Container>
    </Box>
  );
}

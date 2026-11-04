
import { alpha, createTheme } from "@mui/material/styles";

const primary = "#5B21D8";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primary,
      light: "#8B5CF6",
      dark: "#4C1D95",
    },
    background: {
      default: "#F8F7FF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#17132B",
      secondary: "#69647E",
    },
    success: {
      main: "#15803D",
    },
    warning: {
      main: "#D97706",
    },
    error: {
      main: "#DC2626",
    },
    divider: "#EAE7F3",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.035em",
    },
    h6: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F8F7FF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: "#EAE7F3",
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 18,
          boxShadow: "none",
        },
        outlined: {
          borderColor: alpha(primary, 0.3),
          "&:hover": {
            borderColor: primary,
            backgroundColor: alpha(primary, 0.04),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E1DDED",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#A78BFA",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3EFFF",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#30265A",
          fontWeight: 700,
          borderBottom: "1px solid #EAE7F3",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "#F5F1FF",
          },
        },
      },
    },
  },
});

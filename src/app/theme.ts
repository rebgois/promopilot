
import { alpha, createTheme } from "@mui/material/styles";

const primary = "#6045E8";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primary,
      light: "#8B78F5",
      dark: "#4931C4",
    },
    background: {
      default: "#F8F9FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#20243A",
      secondary: "#647084",
    },
    success: {
      main: "#15803D",
    },
    warning: {
      main: "#B45309",
    },
    error: {
      main: "#DC2626",
    },
    divider: "#E6E8EF",
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
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minHeight: "100%",
          backgroundColor: "#F8F9FC",
        },
        body: {
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "#F8F9FC",
        },
        "#root": {
          minHeight: "100vh",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: "#E6E8EF",
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
          minHeight: 40,
          boxShadow: "none",
        },
        outlined: {
          borderColor: "#D8DCE7",
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
            borderColor: "#DDE1EA",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#A99CF5",
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
          backgroundColor: "#F8F9FC",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#475569",
          fontWeight: 700,
          borderBottom: "1px solid #E6E8EF",
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "#F5F6FA",
          },
        },
      },
    },
  },
});

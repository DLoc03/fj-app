import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: "rgb(19, 0, 0)",
      light: "rgb(255, 251, 194)",
    },
    secondary: {
      main: "rgb(48, 48, 48)",
    },
    error: {
      main: red.A400,
    },
    shadow: {
      main: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },
  },
});

export default theme;

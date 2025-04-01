import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "rgb(19, 0, 0)",
    },
    secondary: {
      main: "rgb(48, 48, 48)",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

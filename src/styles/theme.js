import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: { light: "#40cf87", main: "#16d173", dark: "#329c66" },
    secondary: { light: "#80bfff", main: "#80bfff", dark: "#80bfff" },
    text: {
      primary: "#9c9c9c",
      secondary: "#cfcfcf"
    }
  },
  overrides: {
    MuiButton: {
      text: {
        color: "#16d173"
      },
      textPrimary: {
        color: "#FFF"
      },
      containedPrimary: {
        color: "#FFF"
      }
    },
    MuiStepIcon: {
      root: {
        color: "rgba(255, 255, 255, 0.38)",
        border: "1px solid #16d173",
        borderRadius: 15,
        "& text": {
          fill: "#16d173"
        },
        "&$active text": {
          fill: "#fff"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#FFF"
        }
      }
    }
  }
});

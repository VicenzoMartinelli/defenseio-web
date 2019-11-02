import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: { light: "#40cf87", main: "#16d173", dark: "#329c66" },
    secondary: { light: "#05396b", main: "#05396b", dark: "#05396b" },
    text: {
      primary: "#828282",
      secondary: "#9c9c9c"
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
    },
    MuiPickersDay: {
      daySelected: {
        '& p': {
          color: '#FFF'
        }
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '-1px -1px 13px 1px rgba(0,0,0,0.12), 2px 2px 10px 0px rgba(0,0,0,0.12)'
      }
    },
    MuiChip: {
      colorPrimary: {
        color: '#FFF'
      },
      colorSecondary: {
        color: '#FFF'
      }
    }
  }
});

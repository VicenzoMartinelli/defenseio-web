import React from "react";
import GlobalStyle from "./styles/global";
import { ToastProvider } from "react-toast-notifications";
import ToastContainer from "./components/Toast/ToastContainer";
import ToastTop from "./components/Toast/ToastTop";
import Routes from "./routes";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./styles/theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/pt-br";
import GeocodeProvider from "contexts/GeocodeProvider";

const App = () => (
  <GeocodeProvider>
    <MuiThemeProvider theme={theme}>
      <ToastProvider
        placement={"bottom-right"}
        components={{ ToastContainer: ToastContainer, Toast: ToastTop }}
      >
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          libInstance={moment}
          locale={moment.locale("pt-br")}
        >
          <CssBaseline />
          <Routes />
          <GlobalStyle />
        </MuiPickersUtilsProvider>
      </ToastProvider>
    </MuiThemeProvider>
  </GeocodeProvider>
);

export default App;

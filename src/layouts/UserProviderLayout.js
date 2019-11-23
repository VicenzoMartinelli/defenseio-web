import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Loading from "../components/Loading";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import withAuth from "../components/wrappers/withAuth";
import Header from "../components/Header";
import NotFound from "../pages/notfound";
import Negociations from "pages/negociations";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: '100vh'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '5em',
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  colorPrimary: {
    color: theme.palette.primary
  },
  main: {
    marginTop: "10vh"
  },
  marginTopTitle: {
    marginTop: "5%"
  }
}));

const Home = lazy(() => import("../pages/home"));
const Modalities = lazy(() => import("../pages/modalities"));

const UserProviderLayout = () => {
  const classes = useStyles();
  const [open, setOpened] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpened} />
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <Router history={history}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path={["/provider/home"]} component={Home} />
              <Route exact path={["/provider/modalities"]} component={Modalities} />
              <Route exact path={["/provider/negociations"]} component={Negociations} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </div>
  );
};

export default withAuth(UserProviderLayout);

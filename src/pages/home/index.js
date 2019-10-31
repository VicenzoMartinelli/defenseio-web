import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import withAuth from "../../components/wrappers/withAuth";
import Header from "../../components/Header";
import theme from "styles/theme";

const primaryColor = theme.palette.primary;
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
    color: primaryColor
  },
  main: {
    marginTop: "10vh"
  },
  marginTopTitle: {
    marginTop: "5%"
  }
}));

function Home() {
  const classes = useStyles();
  const [open, setOpened] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpened} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      ></main>
    </div>
  );
}
export default withAuth(Home);

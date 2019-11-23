import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, Popover, Hidden } from "@material-ui/core";
import * as auth from "../../services/auth";
import history from "../../history";
import FlexBox from "components/FlexBox";
import Logo from "../../assets/logo.svg";
import Menu from "./Menu";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#fff",
    boxShadow: "-3px -3px 40px -19px rgba(0,0,0,0.75)"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  margLeftSmall: {
    marginLeft: theme.spacing(2)
  },
  boxMenu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  boxLeftMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
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
  centerTitle: {
    flex: 5,
    textAlign: "start",
    alignSelf: "center",
    display: 'inline-flex'
  },
  colorPrimary: {
    color: theme.palette.primary
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  logoContainer: {
    flex: 6,
    display: "flex",
    justifyContent: "start"
  },
  logo: {
    width: 53,
    height: 53
  },
  fullWidth: {
    width: "100%"
  }
}));

export default function Header({ open, setOpen, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();
  const setOpened = setOpen;
  const [openDrop, setOpenDrop] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClose() {
    setAnchorEl(null);
  }
  function handleDrawerOpen() {
    setOpened(true);
  }

  function handleDrawerClose() {
    setOpened(false);
  }
  function handleClickAway() {
    setOpenDrop(false);
  }
  function handleClickDropdown(event) {
    setAnchorEl(event.currentTarget);
    setOpenDrop(true);
  }
  function handleExit() {
    auth.logout();
    history.replace("/");
  }

  const id = openDrop ? "simple-popover" : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Box className={classes.boxMenu}>
            <Box className={clsx(classes.boxLeftMenu, classes.fullWidth)}>
              <IconButton
                color="secondary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <FlexBox direction="row" justify="center" max="true">
                <Hidden smDown>
                  <Typography
                    variant="h6"
                    color="primary"
                    className={clsx(classes.margLeftSmall, classes.centerTitle)}
                    noWrap
                  >
                    Defense. <Typography color="secondary" variant="inherit"> IO</Typography>
                  </Typography>
                </Hidden>

                <div className={classes.logoContainer}>
                  <img src={Logo} className={classes.logo} />
                </div>
              </FlexBox>
            </Box>
            <Box className={classes.boxLeftMenu}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <IconButton onClick={handleClickDropdown}>
                    <AccountCircleOutlined color="primary" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={openDrop}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                  >
                    <List component="nav" aria-label="main mailbox folders">
                      <ListItem button onClick={handleExit}>
                        <ListItemIcon>
                          <ExitToApp className={classes.extendedIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                      </ListItem>
                    </List>
                  </Popover>
                </div>
              </ClickAwayListener>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu classes={classes} open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
}

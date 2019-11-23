import React from 'react';
import { Link } from "react-router-dom";
import {
  AssignmentOutlined, ChatBubbleOutline, DashboardOutlined
} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { Typography, useTheme, IconButton } from '@material-ui/core';

export default function Menu({ classes, handleDrawerClose, open }) {
  const theme = useTheme();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon color="secondary" />
          ) : (
              <ChevronRightIcon color="secondary" />
            )}
        </IconButton>
      </div>
      <Divider />

      <ListItem button component={Link} to={"/provider/home"}>
        <ListItemIcon>
          <HomeOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText
          className={classes.colorsecondary}
          secondary={<Typography color="secondary">Home</Typography>} />
      </ListItem>
      <Divider />

      <ListItem button component={Link} to={"/provider/dashboard"}>
        <ListItemIcon>
          <DashboardOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText
          className={classes.colorsecondary}
          secondary={<Typography color="secondary">Dashboard</Typography>}
        />
      </ListItem>

      <Divider />

      <ListItem button component={Link} to={"/provider/modalities"}>
        <ListItemIcon>
          <AssignmentOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText
          className={classes.colorsecondary}
          secondary={<Typography color="secondary">Modalidades</Typography>}
        />
      </ListItem>

      <Divider />

      <ListItem button component={Link} to={"/provider/negociations"}>
        <ListItemIcon>
          <ChatBubbleOutline color="secondary" />
        </ListItemIcon>
        <ListItemText
          className={classes.colorsecondary}
          secondary={<Typography color="secondary">Negociações</Typography>}
        />
      </ListItem>
    </Drawer>
  );
}

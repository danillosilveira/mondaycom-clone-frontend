import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);

type DrawerSide = "left";

interface Props {
  toggleDrawer: (
    side: DrawerSide,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  state: { left: boolean };
}

const Sidebar: React.FC<Props> = ({ toggleDrawer, state }) => {
  const classes = useStyles();

  const sideList = (side: DrawerSide) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => toggleDrawer(side, false)}
      onKeyDown={() => toggleDrawer(side, false)}
    >
      <List>
        {["Home", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {text === "Home" ? <HomeIcon /> : <MenuIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Login", "Sign Up"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
};

export default Sidebar;

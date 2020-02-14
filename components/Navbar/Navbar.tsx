import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import Sidebar from "./Sidebar";
import { isBrowser } from "../../lib/isBrowser";
import { User } from "../../interfaces/DatabaseTypes/User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    button: {
      borderRadius: "25px",
      marginLeft: theme.spacing(2),
      padding: "8px 25px"
    },
    link: {
      fontFamily: "Roboto Mono !important",
      textDecoration: "none",
      color: "black"
    }
  })
);

const Navbar: React.FC<{ activeUser: User | null }> = ({ activeUser }) => {
  const classes = useStyles();

  const [windowWidth, setWindowWidth] = React.useState<number>(
    isBrowser && window.innerWidth
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  });

  const [state, setState] = React.useState<{ left: boolean }>({
    left: false
  });

  type DrawerSide = "left";

  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          {windowWidth <= 766 && (
            <Sidebar
              activeUser={activeUser}
              toggleDrawer={toggleDrawer}
              state={state}
            />
          )}
          <Typography variant="h6" className={classes.title}>
            <a className={classes.link} href="/">
              MONDAY.COM
            </a>
          </Typography>
          {!activeUser && (
            <>
              <Button href="/login" color="inherit">
                Login
              </Button>

              {windowWidth > 766 && (
                <Button
                  href="/get-started"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  endIcon={<Send />}
                >
                  Get Started
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

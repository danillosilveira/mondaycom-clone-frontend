import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

const options: ThemeOptions = {
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
};

const theme: Theme = createMuiTheme(options);

export default theme;

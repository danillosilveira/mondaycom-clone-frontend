import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme, createStyles } from "@material-ui/core";

export const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

export const useLoginStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    stepper: {
      marginTop: "20px"
    },
    subTitle: {
      marginTop: "10px",
      textAlign: "center",
      fontWeight: "lighter"
    }
  })
);

export const useLoginFormStyles = makeStyles({
  pos: {
    marginBottom: 12
  },
  button: {
    marginTop: 15,
    borderRadius: 25
  },
  header: {
    textAlign: "center"
  },
  textField: {
    marginTop: "5px"
  },
  subTitle: {
    textAlign: "center",
    fontSize: "19px",
    fontWeight: "lighter"
  }
});

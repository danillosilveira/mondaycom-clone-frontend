import * as React from "react";
import {
  withStyles,
  StepConnector,
  StepIconProps,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";

const useQontoStepIconStyles = makeStyles({
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

const QontoStepIcon: React.FC = (props: StepIconProps) => {
  const classes: Record<
    "root" | "circle" | "active" | "completed",
    string
  > = useQontoStepIconStyles();

  const {
    active,
    completed
  }: { active?: boolean; completed?: boolean } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
};

export default QontoStepIcon;

import * as React from "react";
import { withStyles, StepConnector, StepIconProps } from "@material-ui/core";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import { useQontoStepIconStyles } from "./Styles";

export const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

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

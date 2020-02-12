import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { Container, Divider, Link } from "@material-ui/core";
import QontoStepIcon, { QontoConnector } from "./QontoStepIcon";
import { useLoginStyles } from "./Styles";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");

  const classes: Record<
    "root" | "stepper" | "subTitle",
    string
  > = useLoginStyles();

  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  const steps: Array<string> = ["Login to your account", "Enter your password"];

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Stepper
        alternativeLabel
        className={classes.stepper}
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <LoginForm
        email={email}
        setEmail={setEmail}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
      <Divider style={{ marginTop: "15px" }} />
      <Typography className={classes.subTitle} variant="subtitle1">
        {activeStep === 1 ? (
          <span
            onClick={() => {
              setActiveStep(0);
              setEmail("");
            }}
            style={{ color: "#1976D2" }}
          >
            Login with a different email adress
          </span>
        ) : (
          <span>
            Don't have an account yet? <Link href="/signup"> Sign Up</Link>
          </span>
        )}
      </Typography>
    </Container>
  );
};

export default Login;

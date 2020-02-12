import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useLoginFormStyles } from "./Styles";
import { Divider, TextField } from "@material-ui/core";
import { validate } from "graphql";

interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<Props> = ({
  activeStep,
  setActiveStep,
  email,
  setEmail
}) => {
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const validateEmail = (): boolean => {
    const re: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !re.test(String(email).toLowerCase())) return true;
  };

  const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail()) setError(true);
    else {
      setError(false);
      setActiveStep(activeStep + 1);
    }
  };

  const classes: Record<
    "pos" | "header" | "button" | "textField" | "subTitle",
    string
  > = useLoginFormStyles();

  return (
    <Card variant="outlined">
      <CardHeader className={classes.header} title="Log In" />
      <Divider />
      <CardContent>
        {activeStep === 0 && (
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onNext(e)}>
            <Typography variant="subtitle1">
              <b>Enter your work email adress</b>
            </Typography>
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={classes.textField}
              fullWidth
              id="outlined-size-small"
              placeholder="Example@company.com"
              variant="outlined"
              size="small"
              helperText={error && "Please enter a valid email address"}
              error={error}
            />
            <Button
              variant="contained"
              fullWidth
              className={classes.button}
              color="primary"
              type="submit"
            >
              Next
            </Button>
          </form>
        )}
        {activeStep === 1 && (
          <form>
            <Typography className={classes.subTitle} variant="subtitle1">
              {email}
            </Typography>
            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={classes.textField}
              fullWidth
              id="outlined-size-small"
              placeholder="password"
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              fullWidth
              className={classes.button}
              color="primary"
              type="submit"
            >
              Log In
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider, TextField, makeStyles } from "@material-ui/core";
import {
  Props,
  LoginMutationReturnData,
  LoginMutationVariables
} from "../../interfaces/PageInterface/Login/loginform.interfaces";
import { LOGIN } from "../../graphql/user/mutation";
import { useMutation } from "react-apollo";

export const useLoginFormStyles = makeStyles({
  pos: {
    marginBottom: 12
  },
  button: {
    marginTop: "15px",
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

const LoginForm: React.FC<Props> = ({
  activeStep,
  setActiveStep,
  email,
  setEmail
}) => {
  const [password, setPassword] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<{
    error: boolean;
    message: string;
  }>({ error: false, message: "" });

  const [login, { loading }] = useMutation<
    LoginMutationReturnData,
    LoginMutationVariables
  >(LOGIN);

  const validateEmail = (): boolean => {
    const re: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !re.test(String(email).toLowerCase())) return true;
  };

  const validatePassword = (): boolean => {
    if (!password) return true;
  };

  const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail()) setEmailError(true);
    else {
      setEmailError(false);
      setActiveStep(activeStep + 1);
    }
  };

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validatePassword())
      setPasswordError({
        error: true,
        message: "Please enter a valid password."
      });
    else {
      setEmailError(false);
      login({ variables: { email: email.toLowerCase(), password } }).then(
        ({ data }) => {
          setPassword("");

          const errorMessage: string = data.login.errorMessage;
          if (errorMessage !== "No error.") {
            setPasswordError({ error: true, message: errorMessage });
          } else {
            setPasswordError({ error: false, message: errorMessage });
          }

          const token: string = data.login.token.token;
          localStorage.setItem("token", token);
        }
      );
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
              helperText={emailError && "Please enter a valid email address"}
              error={emailError}
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
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onLogin(e)}>
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
              helperText={passwordError.error && passwordError.message}
              error={passwordError.error}
            />
            <Button
              variant="contained"
              fullWidth
              className={classes.button}
              color="primary"
              type="submit"
              disabled={loading}
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

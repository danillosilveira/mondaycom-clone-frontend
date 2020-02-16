import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Divider,
  TextField,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Props,
  SignUpMutationReturnData,
  SignUpMutationVariables,
  TextFieldProps
} from "../../interfaces/PageInterface/SignUp/signupform.interfaces";
import { SIGN_UP } from "../../graphql/user/mutation";
import { useMutation } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";

export const useSignUpFormStyles = makeStyles({
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
    fontWeight: "lighter",
    marginBottom: "15px"
  },
  modalTextField: {
    marginTop: "20px"
  },
  divider: {
    marginTop: "20px"
  }
});

const SignUpForm: React.FC<Props & RouteComponentProps> = ({
  email,
  setEmail,
  history
}) => {
  const [fullName, setFullName] = React.useState<string>("");
  const [fullNameError, setFullNameError] = React.useState<boolean>(false);

  const [password, setPassword] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<boolean>(false);

  const [teamName, setTeamName] = React.useState<string>("");
  const [teamNameError, setTeamNameError] = React.useState<boolean>(false);

  const [processStep, setProcessStep] = React.useState<number>(0);
  const [emailError, setEmailError] = React.useState<boolean>(false);

  const [signUpError, setSignUpError] = React.useState<string | null | boolean>(
    null
  );

  const handleClose = () => {
    setProcessStep(0);
    setEmail("");
    setPasswordError(false);
    setEmailError(false);
    setFullNameError(false);
    setTeamNameError(false);
    setSignUpError(null);
  };

  const [register, { loading }] = useMutation<
    SignUpMutationReturnData,
    SignUpMutationVariables
  >(SIGN_UP);

  const validateEmail = (): boolean => {
    const re: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !re.test(String(email).toLowerCase())) return true;
  };

  const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail()) setEmailError(true);
    else {
      setEmailError(false);
      setProcessStep(1);
    }
  };

  const onSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    !fullName ? setFullNameError(true) : setFullNameError(false);
    !teamName ? setTeamNameError(true) : setTeamNameError(false);

    register({ variables: { fullName, email, password, teamName } }).then(
      ({ data }) => {
        setPassword("");
        setFullName("");
        setTeamName("");

        const errorMessage: string = data.register.errorMessage;
        if (errorMessage !== "No error.") {
          setSignUpError(errorMessage);
        } else {
          setSignUpError(false);

          const userId: string = data.register.user.id;
          localStorage.setItem("userId", userId);

          history.push("/your-boards");
          window.location.reload();
        }
      }
    );
  };

  const classes = useSignUpFormStyles();

  const modalTextFieldProps: TextFieldProps[] = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      error: fullNameError,
      helperText: fullNameError && "FullName is required",
      onChange: e => setFullName(e.target.value),
      value: fullName,
      autoFocus: true
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      error: passwordError,
      helperText: passwordError && "Password is required and min length 6",
      onChange: e => setPassword(e.target.value),
      value: password,
      autoFocus: false
    },
    {
      id: "teamName",
      label: "Team Name",
      type: "text",
      error: teamNameError,
      helperText: teamNameError && "Team Name is required",
      onChange: e => setTeamName(e.target.value),
      value: teamName,
      autoFocus: false
    }
  ];

  return (
    <Card variant="outlined">
      <CardHeader className={classes.header} title="Sign Up" />
      <Divider />
      <CardContent>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onNext(e)}>
          <Typography className={classes.subTitle} variant="subtitle1">
            Sign up with your work email address
          </Typography>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={classes.textField}
            fullWidth
            id="outlined-size-small"
            placeholder="Enter your work email"
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
            Sign Up
          </Button>
        </form>
        {processStep === 1 && (
          <>
            <Dialog
              open={processStep === 1}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle
                style={{ textAlign: "center" }}
                id="form-dialog-title"
              >
                Welcome to monday.com clone
              </DialogTitle>
              <form onSubmit={e => onSignUp(e)}>
                <DialogContent>
                  <DialogContentText style={{ textAlign: "center" }}>
                    Complete your account details
                  </DialogContentText>
                  <Container maxWidth="sm">
                    {modalTextFieldProps.map((props: TextFieldProps) => (
                      <TextField
                        key={props.id}
                        error={props.error}
                        helperText={props.helperText}
                        id={props.id}
                        label={props.label}
                        type={props.type}
                        className={classes.modalTextField}
                        fullWidth
                        onChange={props.onChange}
                        autoFocus={props.autoFocus}
                        value={props.value}
                        autoComplete="off"
                        variant="outlined"
                        margin="dense"
                      />
                    ))}
                  </Container>
                </DialogContent>
                <Divider className={classes.divider} />
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    color="secondary"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loading}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            <Snackbar open={signUpError === false} autoHideDuration={1000}>
              <MuiAlert elevation={6} variant="filled" severity="success">
                This is a success message!
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={signUpError !== "No error." && signUpError !== null}
              autoHideDuration={1000}
            >
              <MuiAlert elevation={6} variant="filled" severity="error">
                {signUpError}
              </MuiAlert>
            </Snackbar>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default withRouter(SignUpForm);

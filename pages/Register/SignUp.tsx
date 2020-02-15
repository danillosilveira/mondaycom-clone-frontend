import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Divider,
  Link,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import LoginForm from "./SignUpForm";
import OtherAuth from "../../components/Hoc/OtherAuth";

export const useSignUpStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: "80px"
    },
    subTitle: {
      marginTop: "10px",
      textAlign: "center",
      fontWeight: "lighter"
    }
  })
);

const SignUp: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");

  const classes: Record<"root" | "subTitle", string> = useSignUpStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <LoginForm email={email} setEmail={setEmail} />
      <Divider style={{ marginTop: "15px" }} />
      <Typography className={classes.subTitle} variant="subtitle1">
        <span>
          If you already Signed Up <Link href="/login"> Log-in here.</Link>
        </span>
      </Typography>
    </Container>
  );
};

export default OtherAuth(
  session => session && session.activeUser.user !== null
)(SignUp);

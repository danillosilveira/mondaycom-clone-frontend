import * as React from "react";
import Head from "../components/Head/Head";
import Home from "./Home/Home";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Login from "./Login/Login";
import SessionWrapperHOC from "../components/Hoc/SessionWrapperHOC";
import { User } from "../interfaces/DatabaseTypes/User";
import SignUp from "./Register/SignUp";
import UserPage from "./UserPage/UserPage";

const App: React.FC<any> = ({ session }) => {
  let activeUser: User | null;

  if (session && session.activeUser.user !== null) {
    activeUser = session.activeUser.user;
  } else {
    activeUser = null;
  }

  console.log(activeUser);

  return (
    <div>
      <Head
        description="mondaycom clone"
        keywords="react mondaycom clone"
        title="Monday.com Clone"
      />

      {!activeUser && <Navbar activeUser={activeUser} />}
      <Switch>
        <Route exact path="/" render={() => <Home activeUser={activeUser} />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/your-boards" render={() => <UserPage />} />
        <Route exact path="*" render={() => <div>page not found</div>} />
      </Switch>
    </div>
  );
};

export default SessionWrapperHOC(App);

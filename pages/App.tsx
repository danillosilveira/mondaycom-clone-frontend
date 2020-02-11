import * as React from "react";
import Head from "../components/Head/Head";
import Home from "./Home/Home";
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Head
        description="mondaycom clone"
        keywords="react mondaycom clone"
        title="Monday.com Clone"
      />

      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="*" render={() => <div>page not found</div>} />
      </Switch>
    </div>
  );
};

export default App;

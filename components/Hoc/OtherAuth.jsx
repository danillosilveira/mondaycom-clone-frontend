import React from "react";
import { Query } from "react-apollo";
import { ACTIVE_USER } from "../../graphql/user/query";
import { Redirect } from "react-router-dom";
import Loop from "@material-ui/icons/Loop";
import { isBrowser } from "../../lib/isBrowser";

const OtherAuth = condition => Component => props => (
  <Query
    query={ACTIVE_USER}
    variables={{ id: isBrowser && localStorage.getItem("userId") }}
  >
    {({ data, loading }) => {
      if (loading) return <Loop />;

      return condition(data) ? <Redirect to="/" /> : <Component {...props} />;
    }}
  </Query>
);

export default OtherAuth;

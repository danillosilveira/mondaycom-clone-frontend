import React from "react";
import { Query } from "react-apollo";
import { ACTIVE_USER } from "../../graphql/user/query";
import Loop from "@material-ui/icons/Loop";
import { isBrowser } from "../../lib/isBrowser";

const SessionWrapperHOC = Component => props => (
  <Query
    query={ACTIVE_USER}
    variables={{ id: isBrowser && localStorage.getItem("userId") }}
  >
    {({ data, loading }) => {
      if (loading) return <Loop />;

      return <Component session={data} {...props} />;
    }}
  </Query>
);

export default SessionWrapperHOC;

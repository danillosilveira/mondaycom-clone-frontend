import * as React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

const Home: React.FC = () => {
  const { data, loading } = useQuery(
    gql`
      query {
        hello(name: "Berkay")
      }
    `
  );

  return <div>{!loading && data.hello}</div>;
};

export default Home;

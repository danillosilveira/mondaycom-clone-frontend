import * as React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { isBrowser } from "../../lib/isBrowser";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import { User } from "../../interfaces/DatabaseTypes/User";

const Home: React.FC<{ activeUser: User | null }> = ({ activeUser }) => {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    isBrowser && window.innerWidth
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  });

  const { data, loading } = useQuery(
    gql`
      query {
        hello(name: "Berkay")
      }
    `
  );

  return (
    <div>
      {!loading && data.hello}
      {windowWidth <= 766 && !activeUser && (
        <Button
          href="/get-started"
          variant="contained"
          color="secondary"
          style={{
            borderRadius: "25px",
            padding: "8px 25px"
          }}
          endIcon={<Send />}
        >
          Get Started
        </Button>
      )}
    </div>
  );
};

export default Home;

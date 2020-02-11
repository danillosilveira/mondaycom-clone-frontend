import * as React from "react";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import withReactRouter from "../components/Hoc/with-react-router";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../utils/theme";

const MyApp: React.FC<any> = ({ Component, pageProps, apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </ApolloProvider>
);

export default withApollo(withReactRouter(MyApp));

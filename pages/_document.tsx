import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from "next/document";
import React from "react";
import { ServerStyleSheets } from "@material-ui/core";
import {
  RenderPage,
  NextComponentType,
  AppContextType,
  AppInitialProps,
  AppPropsType
} from "next/dist/next-server/lib/utils";
import { NextRouter } from "next/router";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const sheets: ServerStyleSheets = new ServerStyleSheets();
  const originalRenderPage: RenderPage = ctx.renderPage;

  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (
        App: NextComponentType<
          AppContextType<NextRouter>,
          AppInitialProps,
          AppPropsType<NextRouter, {}>
        >
      ) => (props: React.PropsWithChildren<AppPropsType<NextRouter, {}>>) => {
        return sheets.collect(<App {...props} />);
      }
    });
  };

  const initialProps: DocumentInitialProps = await Document.getInitialProps(
    ctx
  );

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};

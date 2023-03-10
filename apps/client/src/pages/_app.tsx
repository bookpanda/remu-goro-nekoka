import type { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "@org/apollo";

import "$styles/global.scss";

const client = createApolloClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>レムのゴロゴロ</title>
        <meta content="Remu's Goro Goro" name="description" />
      </Head>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;

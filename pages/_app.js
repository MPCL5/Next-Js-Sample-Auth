import Head from "next/head";
import { onLogin, onLogout } from "../config/auth";
import "../styles/globals.css";
import { AuthProvider } from "../utils/Auth";
import WithAuth from "../utils/WithAuth";
// import dynamic from "next/dynamic";
import Header from "../layouts/Header";

// const WithAuth = dynamic(() => import("../utils/WithAuth"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
      </Head>
      <AuthProvider
        onLogin={onLogin}
        onLogout={onLogout}
        defaultState={
          !!pageProps.authState
            ? {
                isAuthenticated: !!pageProps.authState.token,
                token: pageProps.authState.token,
              }
            : undefined
        }
      >
        <Header />
        {!!Component.needAuth ? (
          <WithAuth>
            <h1 className="text-primary">Need Auth</h1>
            <Component {...pageProps} />
          </WithAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </>
  );
}

export default MyApp;

import "../styles/globals.css";
import "../styles/RichTextEditor.css";
import type { AppProps } from "next/app";
import Meta from "../components/Meta";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store/store";
import { SessionProvider } from "next-auth/react";


function MyApp({ Component, pageProps: { session, pageProps } }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SessionProvider session={session}>
            <Meta />
            <Component {...pageProps} />
          </SessionProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

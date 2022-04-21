import "../styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "../components/Meta";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "../redux/store/store";

function MyApp({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Meta />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

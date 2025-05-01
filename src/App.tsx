import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./global/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import LoadingScreen from "./components/static/LoadingScreen";
import RouterScreen from "./router/RouterScreen";
import PrivateRouter from "./router/PrivateRouter";
import { Helmet } from "react-helmet";
// import { SWRConfig } from "swr";
// import { swrConfig } from "./pages/hook/persistHook";

let persistor = persistStore(store);

const App = () => {
  const helmetContext: any = {};
  return (
    // <SWRConfig value={swrConfig}>
    <div className="bg-white">
      <Helmet>
        <meta charSet="utf-8" />
        <title>The Best School Management Platform</title>
        {/* <link rel="canonical" href="http" /> */}
      </Helmet>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary fallback={<LoadingScreen />}>
            <RouterScreen />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </div>
    // </SWRConfig>
  );
};

export default App;

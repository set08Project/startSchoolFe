import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./global/store";
import { Provider } from "react-redux";
import RouterScreen from "./RouterScreen";
import { ErrorBoundary } from "react-error-boundary";
import LoadingScreen from "./components/static/LoadingScreen";

let persistor = persistStore(store);

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary fallback={<div>LOadding...</div>}>
            <RouterScreen />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;

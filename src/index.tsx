import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import {SetupGlobalAxiosInterceptor} from "./api/interceptors/httpInterceptor";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

// Axios
SetupGlobalAxiosInterceptor();

// Redux
render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <App/>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

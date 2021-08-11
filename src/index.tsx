import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import {SetupGlobalAxiosInterceptor} from "./api/interceptors/HttpInterceptor";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {usersClearProgress} from "./redux/slices/usersSlice";

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
store.dispatch(usersClearProgress());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

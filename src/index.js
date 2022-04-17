import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// import store from './components/redux/store'
// import {Provider} from 'react-redux';

import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  // <Provider store={store}>
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
// </Provider>
,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

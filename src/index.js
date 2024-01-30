import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import Dashboard from "./Pages/Dashboard"
import {Provider} from 'react-redux';
import {store} from './store';
import PrivateRoute from './utils/PrivateRoute';

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then((registration) => {
//       // Uncomment the following line to unregister the service worker
//       registration.unregister();
//     });
// }

ReactDOM.render(
    <GoogleOAuthProvider clientId="776626639075-gmjoit7ivmc9tck898rbc9gn1u7cv7l2.apps.googleusercontent.com">
        <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';

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
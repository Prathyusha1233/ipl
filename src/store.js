import {applyMiddleware} from 'redux';
import {userReducer} from './reducers/users';
// import {contactsReducer} from './reducers/contacts';
import createSagaMiddleware from 'redux-saga';
import { legacy_createStore as createStore} from 'redux'
import {watchUser} from './sagas/usersSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(userReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchUser);

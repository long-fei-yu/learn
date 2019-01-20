import {createStore, applyMiddleware} from 'redux';
import {appReducer} from '../reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    appReducer,
    applyMiddleware(thunk),
);

export {store}